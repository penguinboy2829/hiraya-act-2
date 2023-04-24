from controller.base import Controller
from model.user.crud import verify_user, save_user

class LoginController(Controller):
    def __init__(self):
        super().__init__()
    
    def login_user(self):
        required = self.require_input()
        response = verify_user(required, Controller.get_opened_entity)

        return response
    
    def register_user(self):
        required = self.require_input()
        response = save_user(required, Controller.get_opened_entity)

        return response