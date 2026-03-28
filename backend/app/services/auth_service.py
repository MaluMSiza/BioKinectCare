from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.core.security import verify_password, create_access_token

class AuthService:
    @staticmethod
    async def authenticate_user(db: AsyncSession, username: str, password: str):
        # Query clinicians specifically
        result = await db.execute(select(User).filter(User.username == username))
        user = result.scalars().first()
        
        if not user:
            return None
        
        if not verify_password(password, user.password_hash):
            return None
                
        # Generate Clinician Token
        access_token = create_access_token(data={"sub": username, "role": "clinician"})
        return access_token
