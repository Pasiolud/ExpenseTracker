from . import database
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

expense_tag = Table(
    "expense_tag",
    database.Base.metadata,
    Column("expense_id", Integer, ForeignKey("expenses.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)


class Expense(database.Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    amount = Column(Integer)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="expenses")
    tags = relationship("Tag", secondary=expense_tag, back_populates="expenses")


class User(database.Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    expenses = relationship("Expense", back_populates="owner")


class Tag(database.Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    expenses = relationship("Expense", secondary=expense_tag, back_populates="tags")
