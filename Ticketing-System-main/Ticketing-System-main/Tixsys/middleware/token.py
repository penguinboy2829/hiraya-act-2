from flask import request, jsonify
from flask_jwt_extended import create_access_token, verify_jwt_in_request, jwt_required
from flask_jwt_extended import set_access_cookies, unset_access_cookies, get_jwt, get_jwt_identity
from datetime import datetime, timedelta, timezone

blacklist = []

def verify_bearer():
    if request.endpoint not in ('bp.login_user', 'bp.register_user', 'bp.google_login',
                                'bp.facebook_login', 'bp.slack_login'):
        jwt_required()
        verify_jwt_in_request()

        for token in blacklist:
            if get_jwt()['jti'] == token['jti']:
                return jsonify({'status': 0,
                                'message':'Token is not valid.'})

def refresh_access(response):
    if request.endpoint not in ('bp.login_user', 'bp.register_user', 'bp.logout_user',
                                'bp.google_login', 'bp.facebook_login', 'bp.slack_login'):
        try:
            expiry = get_jwt()['exp']
            threshold = datetime.timestamp(datetime.now(timezone.utc) + timedelta(minutes=20))
            
            if threshold > expiry:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            
        except (RuntimeError, KeyError):
            response = jsonify({'status': 0,
                                'message':'Token is not valid.'})
    
    return response

def revoke_access():
    token = {'jti':get_jwt()['jti'],
             'exp':get_jwt()['exp']}
    
    blacklist.append(token)

    response = jsonify({'status':1,
                        'message':'User logged out.'})
    
    unset_access_cookies(response)
    
    return response

def delete_expired_token():
    for token in blacklist:
        if token['exp'] > datetime.timestamp(datetime.now(timezone.utc)):
            blacklist.remove(token)