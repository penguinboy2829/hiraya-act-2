from flask import jsonify
from model.user.data import User
from model.project.data import Project
from model.task.data import Task

def view_dashboard(user_id, get_opened_entity):
    user = get_opened_entity(entity=User, public_id=user_id, archived=False, select='first')
    projects = get_opened_entity(entity=Project, user_id=user.public_id, archived=False, select='all')
    tasks = get_opened_entity(entity=Task, archived=False, join=Project.tasks, select='join')

    data = {}
    user_data = {'public_id':user.public_id,
                 'first_name':user.first_name,
                 'last_name':user.last_name}
    project_data = [{'public_id':project.public_id,
                     'name':project.name,
                     'description':project.description,
                     'date_created':project.date_created,
                     'date_updated':project.date_updated,
                     'tasks':[{'public_id':task.public_id,
                               'name':task.name,
                               'progress':task.progress,
                               'date_created':task.date_created,
                               'date_due':task.date_due}
                               for task in tasks.filter_by(project_id=project.public_id)]}
                               for project in projects]
    
    data['user'] = user_data
    data['projects'] = project_data

    return jsonify(data)