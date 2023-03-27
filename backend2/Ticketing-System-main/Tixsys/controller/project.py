from flask import redirect, url_for
from model.project.crud import generate_project, view_project, cache_project, edit_project

def create_project():
    response = generate_project()

    return response

def open_project():
    response = redirect(url_for('bp.show_project'))

    return response

def show_project(project_name):
    response = view_project(project_name)

    return response

def archive_project(**kwargs):
    response = cache_project(kwargs)

    return response

def modify_project(**kwargs):
    response = edit_project(kwargs)

    return response