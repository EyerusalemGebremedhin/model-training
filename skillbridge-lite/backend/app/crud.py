from sqlalchemy.orm import Session
import models, schemas

def get_jobs(db: Session, category: str = None):
    query = db.query(models.Job)
    if category:
        query = query.filter(models.Job.category.getattr("iexact")(category))
    return query.all()

def create_job(db: Session, job: schemas.JobCreate):
    db_job = models.Job(**job.model_dump())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job
