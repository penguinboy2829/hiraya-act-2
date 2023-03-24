import jwt
from flask import session, request
from config import SECRET_KEY
from model.variables import Message

def check_token():
    if request.url_rule and 'login' not in request.url_rule.rule:
        
        if 'token' in session:
            token = session.get('token')
            decoded_token = jwt.decode(token, SECRET_KEY)
        
            return decoded_token['public_id']
        
        return Message.not_logged_in

def add_token(public_id):
    token = jwt.encode({'public_id':public_id}, key=SECRET_KEY)
    session['token'] = token

def clear_token():
    session.clear()