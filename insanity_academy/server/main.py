from contextlib import asynccontextmanager
from typing import Annotated, Optional, Union

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select


class CardBase(SQLModel):
    front: str
    back: str
    times_correct: int = 0
    times_tried: int = 0
    mad: int | None


class Card(CardBase, table=True):
    card_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)


class CardPublic(CardBase):
    card_id: int


class CardCreate(CardBase):
    user_id: int


class CardUpdate(CardBase):
    front: str | None = None
    back: str | None = None
    times_correct: int
    times_tried: int
    mad: int | None = None


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


@app.post("/cards", response_model=CardPublic)
def create_card(card: CardCreate, session: SessionDep):
    db_card = Card.model_validate(card)
    session.add(db_card)
    session.commit()
    session.refresh(db_card)
    return db_card


@app.get("/cards", response_model=list[CardPublic])  # Get all the cards
def get_all_cards(session: SessionDep):
    cards = session.exec(select(Card)).all()
    return cards


@app.get("/cards/{card_id}", response_model=CardPublic)  # Get all the cards
def get_card(card_id: int, session: SessionDep):
    card = session.get(Card, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@app.patch("/cards/{card_id}", response_model=CardPublic)
def update_card(card_id: int, card: CardUpdate, session: SessionDep):
    card_db = session.get(Card, card_id)
    if not card_db:
        raise HTTPException(status_code=404, detail="Hero not found")
    card_data = card.model_dump(exclude_unset=True)
    card_db.sqlmodel_update(card_data)
    session.add(card_db)
    session.commit()
    session.refresh(card_db)
    return card_db


@app.delete("/card/{card_id}")
def delete_hero(card_id: int, session: SessionDep):
    card = session.get(Card, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Hero not found")
    session.delete(card)
    session.commit()
    return {"ok": True}
