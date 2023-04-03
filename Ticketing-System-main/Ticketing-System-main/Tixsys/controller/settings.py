from flask import redirect, url_for
from flask_jwt_extended import get_jwt_identity
from controller.base import Controller
from model.settings.crud import revoke_user, dump_user

class SettingsController(Controller):
    def __init__(self):
        super().__init__()
    
    def logout_user(self):
        response = revoke_user()

        return response
    
    def archive_user(self):
        identity = get_jwt_identity()
        response = dump_user(identity, Controller.get_opened_entity)
        
        return response
    
    def verify_user(self):
        response = redirect(url_for('bp.google_login'))

        return response