from passlib.context import CryptContext
import jwt 
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from . models import User
from . database import get_db

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_password_hash(password:str):
    return pwd_context.hash(password)

def verify_password(plain_password:str, hashed_password:str):
    return pwd_context.verify(plain_password, hashed_password)

SECRET_KEY = "tajny_klucz_UGA_BUGA"
ALGORITHM = "HS256"
EXPIRE_TIME_MINUTES = 30

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_TIME_MINUTES)
    to_encode.update({'exp': expire})
    token = jwt.encode(to_encode,key = SECRET_KEY, algorithm= ALGORITHM,)
    return token

def get_current_user(token:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    try:
        result = jwt.decode(token,key=SECRET_KEY, algorithms=[ALGORITHM])
        email:str = result.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Toke without mail")
            
        user = db.query(User).filter(User.email == email).first()
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401,detail = "Authentication error")
     