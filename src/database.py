from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

db_path = Path(__file__).resolve().parent.parent / "expenses.db"
engine = create_engine(
    f"sqlite:///{db_path}", echo=True, connect_args={"check_same_thread": False}
)
Base = declarative_base()

SessionLocal = sessionmaker(bind=engine)


def get_db():
    with SessionLocal() as session:
        yield session
