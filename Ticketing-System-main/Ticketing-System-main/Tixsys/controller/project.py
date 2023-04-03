from flask import redirect, url_for
from flask_jwt_extended import get_jwt_identity
from controller.base import Controller
from model.project.crud import save_project, view_project, edit_project, dump_project

class ProjectController(Controller):
    def __init__(self):
        super().__init__()
    
    def create_project(self):
        identity = get_jwt_identity()
        required = self.require_input()
        response = save_project(identity, required, Controller.get_opened_entity)

        return response
    
    def open_project(self):
        response = redirect(url_for('bp.show_project_data'))

        return response
    
    def show_project_data(self, project_name):
        required = self.require_input()
        response = view_project(project_name, required, Controller.get_opened_entity)

        return response
    
    def modify_project(self, project_name):
        required = self.require_input()
        response = edit_project(project_name, required, Controller.get_opened_entity, Controller.change_entity_values)

        return response
    
    def archive_project(self, project_name):
        required = self.require_input()
        response = dump_project(project_name, required, Controller.get_opened_entity)
        
        return response