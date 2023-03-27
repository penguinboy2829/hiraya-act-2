from flask import Blueprint
from controller.login import LoginController
from controller.dashboard import DashboardController
from controller.settings import SettingsController
from controller.project import ProjectController
from controller.task import TaskController
from controller.subtask import SubtaskController
from middleware.token import verify_bearer

bp = Blueprint('bp', __name__)

bp.before_app_request(verify_bearer)

#Login System
bp.route('/login', methods=['POST'])(LoginController().login_user)
bp.route('/register', methods=['POST'])(LoginController().register_user)

#Dashboard System
bp.route('/dashboard', methods=['GET'])(DashboardController().open_dashboard)
bp.route('/dashboard/create-project', methods=['POST'])(ProjectController().create_project)
bp.route('/dashboard/open-project', methods=['GET'])(ProjectController().open_project)

#Settings System
bp.route('/dashboard/settings/logout', methods=['POST'])(SettingsController().logout_user)
bp.route('/dashboard/settings/delete-user', methods=['PATCH'])(SettingsController().archive_user)

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