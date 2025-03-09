from contextlib import asynccontextmanager
from typing import Annotated, Optional, Union

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Card(SQLModel, table=True):
    card_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
    front: str
    back: str
    times_correct: int
    times_tried: int
    mad: int | None


class User(BaseModel):
    user_id: int
    name: str
    madness: int | None


sqlite_file_name = "database/database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)


@app.post("/cards")
def create_card(card: Card, session: SessionDep) -> Card:
    session.add(card)
    session.commit()
    session.refresh(card)
    return card


@app.get("/cards")  # Get all the cards
def get_all_cards(session: SessionDep) -> list[Card]:
    cards = session.exec(select(Card)).all()
    return cards


@app.get("/cards/{card_id}")  # Get all the cards
def get_card(card_id: int, session: SessionDep):
    card = session.get(Card, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@app.put("/cards/update/{card_id}")
def update_card(card_id: int, correct: bool | None):
    # Update database with card and correct
    return {}
