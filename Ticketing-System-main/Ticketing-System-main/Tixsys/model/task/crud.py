from flask import jsonify
from uuid import uuid4
from model.init_db import db
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask

def save_task(project_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, name=data['name'], archived=False, select='first')

    if not project:
        return jsonify({'status':0,
                        'message':f'Project {project_name} does not exist.'})
    
    if task:
        return jsonify({'status':0,
                        'message':f'Task {task.name} already exists.'})
    
    task = Task(public_id=str(uuid4()), project_id=project.public_id, name=data['name'], description=data['description'])
    
    db.session.add(task)
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'Task {task.name} saved.'})

def view_task(project_name, task_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, project_id=project.public_id, public_id=data['public_id'],
                             name=task_name, archived=False, select='first')

    if not project and not task:
        return jsonify({'status':0,
                        'message':f'Task {task_name} does not exist.'})
    

    subtasks = get_opened_entity(entity=Subtask, task_id=task.public_id, archived=False, select='all')

    task_data = {'name':task.name,
                 'description':task.description,
                 'progress':task.progress,
                 'date_created':task.date_created,
                 'date_due':task.date_due,
                 'subtasks':[{'public_id':subtask.public_id,
                             'name':subtask.name,
                             'done':subtask.done}
                             for subtask in subtasks]}
    
    return jsonify({'task_data':task_data})

def edit_task(project_name, task_name, data, get_opened_entity, change_entity_values):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, public_id=data['public_id'], project_id=project.public_id,
                             name=task_name, archived=False, select='first')

    if not project and not task:
        return jsonify({'status':0,
                        'message':f'Task {task_name} does not exist.'})
    
    modified = change_entity_values(entity=task, data=data)
    
    if modified:
        return jsonify({'status':1,
                        'message':f'Task {task.name} modified.'})
    
    return jsonify({'status':0,
                    'message':f'Task {task.name} not modified.'})
    
def transfer_task(project_name, task_name, data, get_opened_entity):
    progress_list = {1:"In Progress", 2:"Testing", 3:"Revision", 4:"Deployment"}

    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, public_id=data['task_id'], name=task_name, archived=False, select='first')

    if not project and not task:
        return jsonify({'status':0,
                        'message':f'Task {task_name} does not exist.'})
    
    task.progress = progress_list[data['progress']]
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'Task {task.name} moved.'})

def dump_task(project_name, task_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, public_id=data['task_id'], name=task_name, archived=False, select='first')
    subtasks = get_opened_entity(entity=Subtask, task_id=task.public_id, archived=False, select='all')
    
    if not project and not task:
        return jsonify({'status':0,
                        'message':f'Task {task_name} does not exist.'})

    for subtask in subtasks:
        subtask.archived = True

    task.archived = True
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'Task {task.name} archived.'})