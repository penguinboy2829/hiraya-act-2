from flask import jsonify
from uuid import uuid4
from model.init_db import db
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask

def save_subtask(project_name, task_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, name=task_name, archived=False, select='first')
    subtask = get_opened_entity(entity=Subtask, name=data['name'], archived=False, select='first')

    if not project and not task:
        return jsonify({'status':0,
                        'message':f'Project {project_name} and/or Task {task_name} does not exist.'})
    
    if subtask:
        return jsonify({'status':0,
                        'message':f'Subtask {subtask.name} already exists.'})
    
    subtask = Subtask(public_id=str(uuid4()), task_id=task.public_id, name=data['name'], description=data['description'])
    
    db.session.add(subtask)
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'Subtask {subtask.name} saved.'})

def edit_subtask(project_name, task_name, data, get_opened_entity, change_entity_values):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, name=task_name, archived=False, select='first')
    subtask = get_opened_entity(entity=Subtask, public_id=data['public_id'], task_id=task.public_id, archived=False, select='first')

    if not project and not task:
        return jsonify({'status':0,
                        'message':f'Task {task_name} does not exist.'})

    modified = change_entity_values(entity=subtask, data=data)
    
    if modified:
        return jsonify({'status':1,
                        'message':f'Subtask {subtask.name} modified.'})
    
    return jsonify({'status':0,
                    'message':f'Subtask {subtask.name} not modified.'})
    
def dump_subtask(project_name, task_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, name=task_name, archived=False, select='first')
    subtask = get_opened_entity(entity=Subtask, public_id=data['public_id'], task_id=task.public_id,
                                archived=False, select='first')
    
    if not project and not task and not subtask:
        return jsonify({'status':0,
                        'message':'Subtask does not exist.'})
    
    subtask.archived = True
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'Subtask {subtask.name} archived.'})

def mark_subtask(project_name, task_name, data, get_opened_entity):
    project = get_opened_entity(entity=Project, name=project_name, archived=False, select='first')
    task = get_opened_entity(entity=Task, name=task_name, archived=False, select='first')
    subtask = get_opened_entity(entity=Subtask, public_id=data['public_id'], task_id=task.public_id,
                                archived=False, select='first')
    
    if not project and not task and not subtask:
        return jsonify({'status':0,
                        'message':'Subtask does not exist.'})
    
    subtask.done = not subtask.done
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'Subtask {subtask.name} {"completed" if subtask.done else "undo completed"}.'})