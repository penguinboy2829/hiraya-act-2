from flask import jsonify
from model.init_db import db
from model.user.data import User
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask

def revoke_user():
    #Next Update
    return jsonify({'message':'Logout feature will be in the next update.'})

def dump_user(identity, get_opened_entity):
    user = get_opened_entity(entity=User, public_id=identity, archived=False, select='first')
    projects = get_opened_entity(entity=Project, user_id=identity, archived=False, select='all')
    tasks = get_opened_entity(entity=Task, archived=False, join=Project.tasks, select='join')
    subtasks = get_opened_entity(entity=Subtask, archived=False, join=Task.subtasks, select='join')

    if not user:
        return jsonify({'message':'User does not exist.'})
    
    for project in projects:
        for task in tasks.filter_by(project.public_id):
            for subtask in subtasks.filter_by(task.public_id):
                subtask.archived = True

            task.archived = True
        
        project.archived = True

    user.archived = True
    db.session.commit()

    return jsonify({'message':f'User {user.username} archived.'})