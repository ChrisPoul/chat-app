from datetime import datetime
from sqlalchemy import (
    Column, String, DateTime
)
from sqlalchemy.sql import func
from . import database, Model


class User(database.Model, Model):
    id: str = Column(
        String, default=Model.generate_unique_id, primary_key=True
    )
    name: str = Column(String(200), nullable=False, unique=False)
