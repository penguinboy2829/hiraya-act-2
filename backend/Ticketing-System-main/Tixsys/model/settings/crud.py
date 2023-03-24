from flask import request, jsonify
#from middleware.session import check_session, clear_session
from middleware.token import check_token, clear_token
from model.variables import Message
from model.init_db import db
from model.user.data import User
from model.project.data import Project
from model.task.data import Task
from model.subtask.data import Subtask

def cache_user():
    #user_id = check_session()
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.not_logged_in})
    
    data = request.get_json()

    if 'user_id' in data:
        user = User.query.filter_by(public_id=data['user_id'], archived=False).first()

        if user:
            projects = Project.query.filter_by(user_id=user.public_id, archived=False).all()
            project_ids = [project.public_id for project in projects]

            (Task.query.filter(Task.project_id.in_(project_ids), Task.archived==False)
                 .update({Task.archived: True}, synchronize_session=False))

            (Subtask.query.filter(Subtask.task.has(Task.project_id.in_(project_ids)), Subtask.archived==False)
                    .update({Subtask.archived: True}, synchronize_session=False))

            (Project.query.filter(Project.user_id==user.public_id, Project.archived==False)
                    .update({Project.archived: True}, synchronize_session=False))

            user.archived = True
            db.session.commit()

            return jsonify({'message':Message.user_archived})

    return jsonify({'message':Message.user_not_archived})

def quit_user():
    #user_id = check_session()
    user_id = check_token()

    if not user_id:
        return jsonify({'message':Message.already_logged_out})
    
    #clear_session()
    clear_token()
    
    return jsonify({'message':Message.logged_out})