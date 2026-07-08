from pydantic import BaseModel

class JobBase(BaseModel):
    title: str
    company: str
    category: str
    description: str
    location: str
    budget: str

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: int

    class Config:
        from_attributes = True
