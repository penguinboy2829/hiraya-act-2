from flask import Blueprint
from controller.settings import archive_user, logout_user
from controller.login import login_user, register_user
from controller.dashboard import open_dashboard
from controller.project import create_project, open_project, archive_project, modify_project, show_project
from controller.task import create_task, open_task, archive_task, move_task, modify_task, show_task
from controller.subtask import create_subtask, archive_subtask, modify_subtask, complete_subtask

bp = Blueprint('bp', __name__)

#settings
bp.route('dashboard/settings/delete_user', methods=['PATCH'])(archive_user)
bp.route('dashboard/settings/logout', methods=['PATCH'])(logout_user)

#login system
bp.route('/login', methods=['POST'])(login_user)
bp.route('/register', methods=['POST'])(register_user)

#dashboard
bp.route('/dashboard', methods=['GET'])(open_dashboard)
bp.route('/dashboard/open-project', methods=['GET'])(open_project)
bp.route('/dashboard/create-project', methods=['POST'])(create_project)
bp.route('/dashboard/delete-project', methods=['PATCH'])(archive_project)

#project
bp.route('/dashboard/<string:project_name>', methods=['GET'])(show_project)
bp.route('/dashboard/<string:project_name>/delete-project', methods=['PATCH'])(archive_project)
bp.route('/dashboard/<string:project_name>/modify-project', methods=['PATCH'])(modify_project)
bp.route('/dashboard/<string:project_name>/open-task', methods=['GET'])(open_task)
bp.route('/dashboard/<string:project_name>/create-task', methods=['POST'])(create_task)
bp.route('/dashboard/<string:project_name>/delete-task', methods=['PATCH'])(archive_task)
bp.route('/dashboard/<string:project_name>/move-task', methods=['PATCH'])(move_task)

#task
bp.route('/dashboard/<string:project_name>/<string:task_name>', methods=['GET'])(show_task)
bp.route('/dashboard/<string:project_name>/<string:task_name>/delete_task', methods=['PATCH'])(archive_task)
bp.route('/dashboard/<string:project_name>/<string:task_name>/transfer_task', methods=['PATCH'])(move_task)
bp.route('/dashboard/<string:project_name>/<string:task_name>/modify_task', methods=['PATCH'])(modify_task)
bp.route('/dashboard/<string:project_name>/<string:task_name>/create_subtask', methods=['POST'])(create_subtask)
bp.route('/dashboard/<string:project_name>/<string:task_name>/delete_subtask', methods=['PATCH'])(archive_subtask)
bp.route('/dashboard/<string:project_name>/<string:task_name>/modify_subtask', methods=['PATCH'])(modify_subtask)
bp.route('/dashboard/<string:project_name>/<string:task_name>/complete_subtask', methods=['PATCH'])(complete_subtask)