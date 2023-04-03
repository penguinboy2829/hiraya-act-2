from flask import Blueprint
from flask_dance.contrib.google import make_google_blueprint
from flask_dance.contrib.facebook import make_facebook_blueprint
from flask_dance.contrib.slack import make_slack_blueprint
from uuid import uuid4
from config import SECRET_KEY
from controller.login import LoginController
from controller.dashboard import DashboardController
from controller.settings import SettingsController
from controller.project import ProjectController
from controller.task import TaskController
from controller.subtask import SubtaskController
from middleware.token import verify_bearer, refresh_access, delete_expired_token
from config import BLUEPRINT_URL_PREFIX

bp = Blueprint('bp', __name__, url_prefix=BLUEPRINT_URL_PREFIX)

google_bp = make_google_blueprint(client_id=uuid4(),
                                  client_secret=SECRET_KEY,
                                  scope=['profile', 'email'])

facebook_bp = make_facebook_blueprint(client_id=uuid4(),
                                      client_secret=SECRET_KEY,
                                      scope=['email'])

slack_bp = make_slack_blueprint(client_id=uuid4(),
                                client_secret=SECRET_KEY,
                                scope=['identity.basic', 'identity.email'])

bp.before_app_request(verify_bearer)
bp.before_app_request(delete_expired_token)
bp.after_app_request(refresh_access)

#Login System
bp.route('/login', methods=['POST'])(LoginController().login_user)
bp.route('/register', methods=['POST'])(LoginController().register_user)

#Social Media
bp.route('/login/google', methods=['POST'])(LoginController().google_login)
bp.route('/login/facebook', methods=['POST'])(LoginController().facebook_login)
bp.route('/login/slack', methods=['POST'])(LoginController().slack_login)

#Dashboard System
bp.route('/dashboard', methods=['GET'])(DashboardController().open_dashboard)
bp.route('/dashboard/create-project', methods=['POST'])(ProjectController().create_project)
bp.route('/dashboard/open-project', methods=['GET'])(ProjectController().open_project)

#Settings System
bp.route('/dashboard/settings/logout', methods=['POST'])(SettingsController().logout_user)
bp.route('/dashboard/settings/delete-user', methods=['PATCH'])(SettingsController().archive_user)
bp.route('/dashboard/settings/verify-user', methods=['PATCH'])(SettingsController().verify_user)

#Project System
bp.route('/dashboard/<string:project_name>', methods=['GET'])(ProjectController().show_project_data)
bp.route('/dashboard/<string:project_name>/modify-project', methods=['PATCH'])(ProjectController().modify_project)
bp.route('/dashboard/<string:project_name>/delete-project', methods=['PATCH'])(ProjectController().archive_project)
bp.route('/dashboard/<string:project_name>/open-task', methods=['GET'])(TaskController().open_task)
bp.route('/dashboard/<string:project_name>/create-task', methods=['POST'])(TaskController().create_task)
bp.route('/dashboard/<string:project_name>/move-task', methods=['PATCH'])(TaskController().move_task)

#Task System
bp.route('/dashboard/<string:project_name>/<string:task_name>', methods=['GET'])(TaskController().show_task_data)
bp.route('/dashboard/<string:project_name>/<string:task_name>/delete-task', methods=['PATCH'])(TaskController().archive_task)
bp.route('/dashboard/<string:project_name>/<string:task_name>/modify-task', methods=['PATCH'])(TaskController().modify_task)
bp.route('/dashboard/<string:project_name>/<string:task_name>/create-subtask', methods=['POST'])(SubtaskController().create_subtask)
bp.route('/dashboard/<string:project_name>/<string:task_name>/delete-subtask', methods=['PATCH'])(SubtaskController().archive_subtask)
bp.route('/dashboard/<string:project_name>/<string:task_name>/modify-subtask', methods=['PATCH'])(SubtaskController().modify_subtask)
bp.route('/dashboard/<string:project_name>/<string:task_name>/complete-subtask', methods=['PATCH'])(SubtaskController().complete_subtask)