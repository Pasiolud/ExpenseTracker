from pydantic import BaseModel, ConfigDict, EmailStr, Field


class TagBase(BaseModel):
    name: str


class TagResponse(TagBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class TagCreate(TagBase):
    pass


class ExpenseBase(BaseModel):
    name: str
    amount: float = Field(gt=0, description="You cannot add expense lesset than 0!")


class ExpenseCreate(ExpenseBase):
    tag_ids: list[int] = []


class ExpenseResponse(ExpenseBase):
    id: int
    owner_id: int
    tags: list[TagResponse] = []
    model_config = ConfigDict(from_attributes=True)


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class PromptBase(BaseModel):
    text: str
