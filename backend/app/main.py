from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings
from app.db.database import connect_to_db, close_db_connection, AsyncSessionLocal
from app.services.mqtt_service import mqtt_client
from app.models.user import User  # Essential for table creation
from app.models.patient import Patient # Essential for table creation
from app.core.security import get_password_hash
from sqlalchemy.future import select
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def seed_admin_user():
    """Seeds the initial admin user if not exists"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).filter(User.username == "admin"))
        admin = result.scalars().first()
        
        if not admin:
            logger.info("Seeding initial admin user...")
            hashed_pw = get_password_hash("admin123")
            new_admin = User(
                username="admin",
                password_hash=hashed_pw,
                full_name="BioKinect Administrator"
            )
            session.add(new_admin)
            await session.commit()
            logger.info("Admin user created: admin / admin123")
        else:
            logger.info("Admin user already exists.")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_db()
    await seed_admin_user() # Execute seeding
    mqtt_client.start()
    logger.info("Application started: PostgreSQL & MQTT Connected")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_db_connection()
    mqtt_client.stop()
    logger.info("Application stopped")

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to BioKinectCare API"}
