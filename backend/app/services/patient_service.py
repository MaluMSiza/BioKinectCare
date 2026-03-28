from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.patient import Patient, PatientCreate, PatientUpdate
from app.core.security import get_password_hash
import datetime

class PatientService:
    @staticmethod
    async def get_patient_by_username(db: AsyncSession, username: str):
        result = await db.execute(select(Patient).filter(Patient.username == username))
        return result.scalars().first()

    @staticmethod
    async def get_all_patients(db: AsyncSession):
        result = await db.execute(select(Patient))
        patients = result.scalars().all()
        # Ensure dates are strings for json serialization
        ret = []
        for p in patients:
            p_dict = {
                "id": p.id,
                "_id": p.id, # keeping _id for frontend compatibility
                "full_name": p.full_name,
                "username": p.username,
                "date_of_birth": p.date_of_birth.isoformat() if p.date_of_birth else None,
                "muscle": p.muscle,
                "calibration": p.calibration
            }
            ret.append(p_dict)
        return ret

    @staticmethod
    async def create_patient(db: AsyncSession, patient_in: PatientCreate):
        existing = await PatientService.get_patient_by_username(db, patient_in.username)
        if existing:
            return None
        
        dob = patient_in.date_of_birth
        if isinstance(dob, str):
            dob = datetime.datetime.strptime(dob, "%Y-%m-%d").date()

        hashed_pw = get_password_hash(patient_in.password)
        
        new_patient = Patient(
            full_name=patient_in.full_name,
            username=patient_in.username,
            date_of_birth=dob,
            muscle=patient_in.muscle,
            password_hash=hashed_pw,
            calibration=patient_in.calibration
        )
        db.add(new_patient)
        await db.commit()
        await db.refresh(new_patient)
        return new_patient.id

    @staticmethod
    async def update_patient(db: AsyncSession, username: str, patient_update: PatientUpdate):
        patient = await PatientService.get_patient_by_username(db, username)
        if not patient:
            return False
            
        update_data = patient_update.model_dump(exclude_unset=True)
        
        if "password" in update_data:
            patient.password_hash = get_password_hash(update_data["password"])
            del update_data["password"]
            
        if "date_of_birth" in update_data and isinstance(update_data["date_of_birth"], str):
            update_data["date_of_birth"] = datetime.datetime.strptime(update_data["date_of_birth"], "%Y-%m-%d").date()

        for key, value in update_data.items():
            setattr(patient, key, value)
            
        await db.commit()
        return True

    @staticmethod
    async def delete_patient(db: AsyncSession, username: str):
        patient = await PatientService.get_patient_by_username(db, username)
        if patient:
            await db.delete(patient)
            await db.commit()
            return True
        return False

    @staticmethod
    async def calibrate_patient(db: AsyncSession, username: str, flex_samples: list[float], rest_samples: list[float]):
        patient = await PatientService.get_patient_by_username(db, username)
        if not patient:
            return None
            
        # Calculate threshold as the average of flexion samples
        if not flex_samples:
            threshold = 0.5 # Default fallback
        else:
            # For "average of peaks", if data is continuous, a simple average is a good start. 
            # Or if it's 3 peaks, we'd find the local maxima.
            # To be simple and follow "average":
            threshold = sum(flex_samples) / len(flex_samples)
        
        # We can also factor in the rest samples if needed (e.g., threshold = (mean_flex + mean_rest) / 2)
        if rest_samples:
            mean_rest = sum(rest_samples) / len(rest_samples)
            # A common way to define activation threshold is 1.5-2x the resting baseline 
            # OR the midpoint between rest and flex.
            threshold = (threshold + mean_rest) / 2

        calibration_data = {
            "threshold": round(threshold, 4),
            "calibrated_at": datetime.datetime.now().isoformat(),
            "flex_peak_avg": round(sum(flex_samples)/len(flex_samples) if flex_samples else 0, 4),
            "rest_avg": round(sum(rest_samples)/len(rest_samples) if rest_samples else 0, 4)
        }
        
        patient.calibration = calibration_data
        await db.commit()
        await db.refresh(patient)
        return calibration_data
