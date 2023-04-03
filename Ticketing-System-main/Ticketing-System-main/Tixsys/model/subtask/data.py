from datetime import datetime
from model.init_db import db

class Subtask(db.Model):
    __tablename__ = 'subtasks'
    _id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    task_id = db.Column(db.String(50), db.ForeignKey('tasks.public_id'))
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    priority_level = db.Column(db.Integer, default=1, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    date_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.now, nullable=False)
    date_due = db.Column(db.DateTime)
    date_archived = db.Column(db.DateTime)
    done = db.Column(db.Boolean, default=False, nullable=False)
    archived = db.Column(db.Boolean, default=False, nullable=False)