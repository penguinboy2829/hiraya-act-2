from flask_jwt_extended import get_jwt_identity
from controller.base import Controller
from model.dashboard.crud import view_dashboard

class DashboardController(Controller):
    def __init__(self):
        super().__init__()

    def open_dashboard(self):
        identity = get_jwt_identity()
        response = view_dashboard(identity, Controller.get_opened_entity)

        return response