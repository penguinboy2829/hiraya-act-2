from flask import request
from flask_jwt_extended import verify_jwt_in_request

def verify_bearer():
    if request.endpoint != 'bp.login_user' and request.endpoint != 'bp.register_user':
        verify_jwt_in_request()

def refresh_access():
    #Next update
    pass