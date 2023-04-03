from controller.base import Controller
from model.user.crud import authenticate_user, save_user, social_media_authenticate

class LoginController(Controller):
    def __init__(self):
        super().__init__()
    
    def login_user(self):
        required = self.require_input()
        response = authenticate_user(required, Controller.get_opened_entity)

        return response
    
    def register_user(self):
        required = self.require_input()
        response = save_user(required, Controller.get_opened_entity)

        return response
    
    def google_login(self):
        response = social_media_authenticate('google', Controller.get_opened_entity)

        return response
    
    def facebook_login(self):
        response = social_media_authenticate('facebook', Controller.get_opened_entity)

        return response
    
    def slack_login(self):
        response = social_media_authenticate('slack', Controller.get_opened_entity)

        return response