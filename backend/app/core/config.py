from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "BioKinectCare API"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@postgres:5432/biokinectcare"
    SECRET_KEY: str = "supersecretkey"  # Change in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    MQTT_BROKER_HOST: str = "localhost"
    MQTT_BROKER_PORT: int = 1883

    class Config:
        env_file = ".env"

settings = Settings()
