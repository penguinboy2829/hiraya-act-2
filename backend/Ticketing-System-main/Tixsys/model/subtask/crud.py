from flask import request, jsonify
from uuid import uuid4
from model.variables import Message
from model.init_db import db
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask
#from middleware.session import check_session
from middleware.token import check_token

def generate_subtask(kwarg):
    #user_id = check_session()
    user_id = check_token()

    if not user_id:
        return jsonify({'message':'User not logged in.'})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=kwarg['task_name'], archived=False).first()

    data = request.get_json()
    
    if 'task_id' in data and 'project_id' in data and project and task:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=data['project_id'], archived=False).first()
        description = ''

        if 'name' in data:
            subtask = Subtask.query.filter_by(task_id=task.public_id, name=data['name'], archived=False).first()
            
            if subtask:
                return jsonify({'message':Message.subtask_exists})
            
            if 'description' in data:
                description = data['description']

            subtask = Subtask(public_id=str(uuid4()),
                        task_id=task.public_id,
                        name=data['name'],
                        description=description,
                        priority_level=0,
                        done=False,
                        archived=False)
        
            db.session.add(subtask)
            db.session.commit()

            return jsonify({'message':Message.subtask_created})

    return jsonify({'message':Message.subtask_not_created})

def cache_subtask(kwarg):
    #user_id = check_session()
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=kwarg['task_name'], archived=False).first()

    data = request.get_json()

    if 'subtask_id' in data and 'task_id' in data and 'project_id' in data and project and task:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=data['project_id'], archived=False).first()
        subtask = Subtask.query.filter_by(public_id=data['subtask_id'], task_id=task.public_id, archived=False).first()
        
        subtask.archived = True
        db.session.commit()

        return jsonify({'message':Message.subtask_archived})

    return jsonify({'message':Message.subtask_not_archived})

def finish_subtask(kwarg):
    #user_id = check_session()
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=kwarg['task_name'], archived=False).first()

    data = request.get_json()

    if 'subtask_id' in data and 'task_id' in data and 'project_id' in data and project and task:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=data['project_id'], archived=False).first()
        subtask = Subtask.query.filter_by(public_id=data['subtask_id'], task_id=task.public_id, archived=False).first()
        
        subtask.done = not subtask.done
        db.session.commit()

        return jsonify({'message':Message.subtask_completed})

    return jsonify({'message':Message.subtask_not_completed})

def edit_subtask(kwarg):
    #user_id = check_session()
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=kwarg['task_name'], archived=False).first()

    data = request.get_json()

    if 'subtask_id' in data and 'task_id' in data and 'project_id' in data and project and task:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=data['project_id'], archived=False).first()
        subtask = Subtask.query.filter_by(public_id=data['subtask_id'], task_id=task.public_id, archived=False).first()
        
        if 'name' in data and data['name']:
            subtask.name = data['name']

        if 'description' in data:
            subtask.description = data['description']

        if 'priority_level' in data and data['priority_level'] > 0 and data['priority_level'] < 1:
            subtask.priority_level = data['priority_level']

        if 'date_due' in data:
            subtask.date_due = data['date_due']
            
        db.session.commit()

        return jsonify({'message':Message.subtask_archived})

    return jsonify({'message':Message.subtask_not_archived})