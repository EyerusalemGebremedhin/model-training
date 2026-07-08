from sqlalchemy import Column, Integer, String, Text
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String)
    category = Column(String, index=True)
    description = Column(Text)
    location = Column(String)
    budget = Column(String)
