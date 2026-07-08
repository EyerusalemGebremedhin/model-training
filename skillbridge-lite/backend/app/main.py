from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from fastapi import Query

from database import engine, get_db, Base
import models, schemas, crud

# Automatically create the database tables on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkillBridge Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/jobs", response_model=List[schemas.JobResponse])
def read_jobs(category: Optional[str] = Query(None), db = Depends(get_db)):
    return crud.get_jobs(db, category=category)

@app.post("/api/jobs", response_model=schemas.JobResponse)
def post_job(job: schemas.JobCreate, db = Depends(get_db)):
    return crud.create_job(db, job=job)

@app.post("/api/jobs/{job_id}/apply")
def apply_to_job(job_id: int):
    return {"message": f"Successfully applied to job {job_id}!"}
