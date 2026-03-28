from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.patient import PatientCreate, PatientUpdate, CalibrateData
from app.services.patient_service import PatientService
from app.db.database import get_db

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_patient(patient: PatientCreate, db: AsyncSession = Depends(get_db)):
    patient_id = await PatientService.create_patient(db, patient)
    if not patient_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Patient with username '{patient.username}' already exists. Try '{patient.username}123'."
        )
    return {"message": "Patient created successfully", "id": patient_id}

@router.get("/", response_model=List[dict])
async def list_patients(db: AsyncSession = Depends(get_db)):
    return await PatientService.get_all_patients(db)

@router.put("/{username}")
async def update_patient(username: str, patient: PatientUpdate, db: AsyncSession = Depends(get_db)):
    updated = await PatientService.update_patient(db, username, patient)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found or no changes made")
    return {"message": "Patient updated successfully"}

@router.delete("/{username}")
async def delete_patient(username: str, db: AsyncSession = Depends(get_db)):
    deleted = await PatientService.delete_patient(db, username)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    return {"message": "Patient deleted successfully"}

@router.post("/{username}/calibrate")
async def calibrate_patient(username: str, data: CalibrateData, db: AsyncSession = Depends(get_db)):
    result = await PatientService.calibrate_patient(db, username, data.flex_samples, data.rest_samples)
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    return result
