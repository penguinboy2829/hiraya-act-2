from flask import redirect, url_for
from controller.base import Controller
from model.task.crud import save_task, view_task, edit_task, dump_task, transfer_task

class TaskController(Controller):
    def __init__(self):
        super().__init__()

    def create_task(self, project_name):
        required = self.require_input()
        response = save_task(project_name, required, Controller.get_opened_entity)

        return response
    
    def open_task(self):
        response = redirect(url_for('bp.show_task_data'))

        return response
    
    def show_task_data(self, project_name, task_name):
        required = self.require_input()
        response = view_task(project_name, task_name, required, Controller.get_opened_entity)

        return response
    
    def modify_task(self, project_name, task_name):
        required = self.require_input()
        response = edit_task(project_name, task_name, required, Controller.get_opened_entity, Controller.change_entity_values)

        return response
    
    def move_task(self, project_name, task_name):
        required = self.require_input()
        response = transfer_task(project_name, task_name, required, Controller.get_opened_entity)

        return response

    def archive_task(self, project_name, task_name):
        required = self.require_input()
        response = dump_task(project_name, task_name, required, Controller.get_opened_entity)
        
        return response
    