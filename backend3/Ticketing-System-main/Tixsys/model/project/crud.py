from flask import jsonify
from uuid import uuid4
from model.init_db import db
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask

def save_project(user_id, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=data['name'], archived=False, select='first')

    if project:
        return jsonify({'message':f'Project {project.name} already exists.'})
    
    project = Project(public_id=str(uuid4()), user_id=user_id, name=data['name'], description=data['description'])
    
    db.session.add(project)
    db.session.commit()

    return jsonify({'message':f'Project {project.name} saved.'})

def view_project(project_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, public_id=data['public_id'], name=project_name, archived=False, select='first')

    if not project:
        return jsonify({'message':f'Project {project_name} does not exist.'})
    
    tasks = get_opened_entity(entity=Task, project_id=project.public_id, archived=False, select='all')
    subtasks = get_opened_entity(entity=Subtask, archived=False, join=Task.subtasks, select='join')

    project_data = {'public_id':project.public_id,
                    'name':project.name,
                    'date_created':project.date_created,
                    'date_updated':project.date_updated,
                    'tasks':[{'public_id':task.public_id,
                            'name':task.name,
                            'description':task.description,
                            'progress':task.progress,
                            'date_created':task.date_created,
                            'date_due':task.date_due,
                            'subtasks':[{'public_id':subtask.public_id,
                                        'name':subtask.name,
                                        'done':subtask.done}
                                        for subtask in subtasks.filter_by(task_id=task.public_id)]}
                                        for task in tasks]}
    
    return jsonify({'project_data':project_data})

def edit_project(project_name, data, get_opened_entity, change_entity_values):
    project = get_opened_entity(entity=Project, public_id=data['public_id'], name=project_name, archived=False, select='first')

    if not project:
        return jsonify({'message':f'Project {project_name} does not exist.'})
    
    modified = change_entity_values(entity=project, data=data)
    
    if modified:
        return jsonify({'message':f'Project {project.name} modified.'})
    
    return jsonify({'message':f'Project {project.name} not modified.'})
    
def dump_project(project_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, public_id=data['public_id'], name=project_name, archived=False, select='first')
    tasks = get_opened_entity(entity=Task, project_id=project.public_id, archived=False, select='all')
    subtasks = get_opened_entity(entity=Subtask, archived=False, join=Task.subtasks, select='join')

    if not project:
        return jsonify({'message':f'Project {project_name} does not exist.'})
        
    for task in tasks:
        for subtask in subtasks.filter_by(task.public_id):
            subtask.archived = True

        task.archived = True

        

    project.archived = True
    db.session.commit()

    return jsonify({'message':f'Project {project.name} archived.'})