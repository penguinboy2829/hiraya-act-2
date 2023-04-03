from flask import redirect, url_for
from controller.base import Controller
from model.subtask.crud import save_subtask, edit_subtask, dump_subtask, mark_subtask

class SubtaskController(Controller):
    def __init__(self):
        super().__init__()

    def create_subtask(self, project_name, task_name):
        required = self.require_input()
        response = save_subtask(project_name, task_name, required, Controller.get_opened_entity)

        return response
    
    def modify_subtask(self, project_name, task_name):
        required = self.require_input()
        response = edit_subtask(project_name, task_name, required, Controller.get_opened_entity, Controller.change_entity_values)

        return response

    def archive_subtask(self, project_name, task_name):
        required = self.require_input()
        response = dump_subtask(project_name, task_name, required, Controller.get_opened_entity)
        
        return response
    
    def complete_subtask(self, project_name, task_name):
        required = self.require_input()
        response = mark_subtask(project_name, task_name, required, Controller.get_opened_entity)
        
        return response
    