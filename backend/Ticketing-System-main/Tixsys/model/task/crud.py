from flask import request, jsonify
from uuid import uuid4
from model.variables import Message, progress_list
from model.init_db import db
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask
from middleware.token import check_token

def generate_task(kwarg):
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    data = request.get_json()
    
    if 'project_id' in data and project:
        project = Project.query.filter_by(public_id=data['project_id'], user_id=user_id, archived=False).first()
        description = ''

        if 'name' in data:
            task = Task.query.filter_by(project_id=project.public_id, name=data['name'], archived=False).first()

            if task:
                return jsonify({'message':Message.task_exists})
            
            if 'description' in data:
                description = data['description']

            task = Task(public_id=str(uuid4()),
                        project_id=project.public_id,
                        name=data['name'],
                        description=description,
                        priority_level=0,
                        progress='In Progress',
                        archived=False)
        
            db.session.add(task)
            db.session.commit()

            return jsonify({'message':Message.task_created})

    return jsonify({'message':Message.task_not_created})

def view_task(project_name, task_name):
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=project_name, archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=task_name, archived=False).first()
    data = request.get_json()

    if 'project_id' in data and 'task_id' in data and project and task:
        subtasks = Subtask.query.filter_by(task_id=data['task_id'], archived=False).all()

        task_data = {'public_id':task.public_id,
                     'name':task.name,
                     'description':task.description,
                     'subtasks':[{'public_id':subtask.public_id,
                                  'name':subtask.name,
                                  'description':subtask.description,
                                  'done':subtask.done} for subtask in subtasks]}
        
        return jsonify({'task_data':task_data})
    
    return jsonify({'message':Message.task_not_opened})

def cache_task(kwarg):
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=kwarg['task_name'], archived=False).first()
    data = request.get_json()

    if 'project_id' in data and 'task_id' in data and project and task:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=data['project_id'], archived=False).first()
        subtasks = Subtask.query.filter_by(task_id=task.public_id, archived=False).all()
        
        for subtask in subtasks:
            subtask.archived = True

        task.archived = True
        db.session.commit()

        return jsonify({'message':Message.task_archived})

    return jsonify({'message':Message.task_not_archived})

def shift_task(kwarg):
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    data = request.get_json()

    if 'project_id' in data and 'task_id' in data and 'progress' in data and project:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=project.public_id, archived=False).first()

        if data['progress'] in progress_list:
            task.progress = data['progress']
            db.session.commit()

            return jsonify({'message':Message.task_moved})

    return jsonify({'message':Message.task_not_moved})

def edit_task(kwarg):
    user_id = check_token()
    
    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    project = Project.query.filter_by(user_id=user_id, name=kwarg['project_name'], archived=False).first()
    task = Task.query.filter_by(project_id=project.public_id, name=kwarg['task_name'], archived=False).first()
    data = request.get_json()

    if 'project_id' in data and 'task_id' in data and project and task:
        task = Task.query.filter_by(public_id=data['task_id'], project_id=data['project_id'], archived=False).first()
        
        if 'name' in data:
            task.name = data['name']
        
        if 'description' in data:
            task.description = data['name']

        if 'priority_level' in data and data['priority_level'] > 0 and data['priority_level'] < 1:
            task.priority_level = data['priority_level']
        
        if 'date_due' in data:
            task.date_due = data['date_due']

        db.session.commit()

        return jsonify({'message':Message.task_modified})

    return jsonify({'message':Message.task_not_modified})