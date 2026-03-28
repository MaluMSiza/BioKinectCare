from sqlalchemy import Column, Integer, String, Date, JSON
from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date, datetime
import uuid
from app.db.database import Base

# SQLAlchemy ORM Model
class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    full_name = Column(String, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    muscle = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    calibration = Column(JSON, nullable=True)

# Pydantic Schemas
class PatientBase(BaseModel):
    full_name: str
    username: str
    date_of_birth: date | str
    muscle: str
    calibration: Optional[dict] = None

class PatientCreate(PatientBase):
    password: str

class PatientUpdate(BaseModel):
    full_name: Optional[str] = None
    date_of_birth: Optional[date | str] = None
    muscle: Optional[str] = None
    password: Optional[str] = None
    calibration: Optional[dict] = None

class PatientInDB(PatientBase):
    id: str
    model_config = ConfigDict(from_attributes=True)

class CalibrateData(BaseModel):
    flex_samples: list[float]
    rest_samples: list[float]
