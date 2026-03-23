import fastapi
from sqlalchemy.orm import Session
from . import database
from . import models
from . import auth
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from . import schemas
from fastapi.middleware.cors import CORSMiddleware

origins = ["http://127.0.0.1:5173", "http://localhost:5173"]

app = fastapi.FastAPI()
database.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/expenses", response_model=list[schemas.ExpenseResponse])
def get_expenses(
    db: Session = fastapi.Depends(database.get_db),
    current_user=fastapi.Depends(auth.get_current_user),
):
    return current_user.expenses


@app.post("/expenses", response_model=schemas.ExpenseResponse)
def add_exepnse(
    expense: schemas.ExpenseCreate,
    db: Session = fastapi.Depends(database.get_db),
    current_user: models.User = fastapi.Depends(auth.get_current_user),
):

    new_expense = models.Expense(name=expense.name, amount=expense.amount)
    for tag_id in expense.tag_ids:
        tag = db.query(models.Tag).filter(models.Tag.id == tag_id).first()
        if tag:
            new_expense.tags.append(tag)
    current_user.expenses.append(new_expense)

    db.add(new_expense)
    db.commit()
    return new_expense


@app.delete("/expenses/{expense_id}")
def delete_exepnses(
    expense_id: int,
    db: Session = fastapi.Depends(database.get_db),
    current_user: models.User = fastapi.Depends(auth.get_current_user),
):
    expense = (
        db.query(models.Expense)
        .filter(
            models.Expense.id == expense_id, models.Expense.owner_id == current_user.id
        )
        .first()
    )
    if expense:
        db.delete(expense)
        db.commit()
        raise HTTPException(status_code=204)
    else:
        raise HTTPException(status_code=404, detail="Wrong expense_id")


@app.put("/expenses/{expense_id}", response_model=schemas.ExpenseResponse)
def update_expenses(
    expense_id: int,
    updated_expense: schemas.ExpenseCreate,
    db: Session = fastapi.Depends(database.get_db),
    current_user: models.User = fastapi.Depends(auth.get_current_user),
):
    expense = (
        db.query(models.Expense)
        .filter(
            models.Expense.id == expense_id, models.Expense.owner_id == current_user.id
        )
        .first()
    )

    if expense:
        expense.name = updated_expense.name
        expense.amount = updated_expense.amount
        db.add(expense)
        db.commit()
        db.refresh(expense)
        return expense
    else:
        raise HTTPException(status_code=400, detail="Wrong Id")


@app.post("/tags", response_model=schemas.TagResponse)
def add_tag(
    tag: schemas.TagCreate,
    db: Session = fastapi.Depends(database.get_db),
    current_user=fastapi.Depends(auth.get_current_user),
):
    check_if_exists = db.query(models.Tag).filter(models.Tag.name == tag.name).first()
    if check_if_exists:
        raise HTTPException(status_code=400, detail="Tag already exist's")

    new_tag = models.Tag(name=tag.name)
    db.add(new_tag)
    db.commit()
    db.refresh(new_tag)
    return new_tag


@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db=fastapi.Depends(database.get_db)):
    result = db.query(models.User).filter(models.User.email == user.email).first()
    if result:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = fastapi.Depends(),
    db: Session = fastapi.Depends(database.get_db),
):
    result_email = (
        db.query(models.User).filter(models.User.email == form_data.username).first()
    )
    if result_email:
        if auth.verify_password(form_data.password, result_email.hashed_password):
            access_token = auth.create_access_token(data={"sub": form_data.username})
            return {"access_token": access_token, "token_type": "bearer"}
        else:
            raise HTTPException(status_code=401, detail="Wrong password")
    else:
        raise HTTPException(status_code=400, detail="Wrong email")
