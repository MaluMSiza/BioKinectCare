from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

engine = create_async_engine(settings.DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

async def connect_to_db():
    logger.info("Connecting to PostgreSQL...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("PostgreSQL connected and tables created!")

async def close_db_connection():
    logger.info("Closing PostgreSQL connection...")
    await engine.dispose()
    logger.info("PostgreSQL connection closed!")

# Dependency
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
