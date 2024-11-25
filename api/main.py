import firebase_admin
from firebase_admin import credentials, db
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Union
import jwt
import datetime

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://netdetect-b48e0-default-rtdb.firebaseio.com' 
})

app = FastAPI()

SECRET_KEY = "mysecretkey"  
ALGORITHM = "HS256"  
ACCESS_TOKEN_EXPIRE_MINUTES = 30 


class Account(BaseModel):
    email: str
    password: str


def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15) 

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=403, detail="Could not validate credentials")


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


@app.get("/auth")
def read_item(q: Union[str, None] = None):
    ref = db.reference(f'auth')
    item_data = ref.get()

    if item_data:
        return item_data
    else:
        return {"error": "Item not found"}


@app.post("/login")
async def login(account: Account):
    ref = db.reference(f'auth')
    item_data = ref.get()

    if item_data:
        if item_data['email'] == account.email and item_data['password'] == account.password:
            token_data = {"sub": account.email} 
            access_token = create_access_token(data=token_data)

            return {"message": "Successfully logged in", "access_token": access_token}
        else:
            return {"message": "Invalid credentials"}
    else:
        return {"error": "Internal Error"}


@app.get("/protected")
async def protected_route(token: str = Depends(verify_access_token)):
    return {"message": "Protected content", "user": token}
