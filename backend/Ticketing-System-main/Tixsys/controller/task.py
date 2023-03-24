from flask import redirect, url_for
from model.task.crud import generate_task, view_task, cache_task, shift_task, edit_task

def create_task(**kwargs):
    response = generate_task (kwargs)

    return response

def open_task():
    response = redirect(url_for('bp.show_task'))

    return response

def show_task(project_name, task_name):
    response = view_task(project_name=project_name, task_name=task_name)

    return response

def archive_task(**kwargs):
    response = cache_task(kwargs)

    return response

def move_task(**kwargs):
    response = shift_task(kwargs)

    return response

def modify_task(**kwargs):
    response = edit_task(kwargs)

    return response