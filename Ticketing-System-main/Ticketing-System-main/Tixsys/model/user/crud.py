from flask import jsonify
from flask_jwt_extended import create_access_token, set_access_cookies
from flask_dance.contrib.google import google
from flask_dance.contrib.facebook import facebook
from flask_dance.contrib.slack import slack
from uuid import uuid4
from werkzeug.security import check_password_hash
from model.init_db import db
from model.user.data import User

def authenticate_user(data, get_opened_entity):
    user = get_opened_entity(entity=User, email=data['email'], archived=False, select='first')
    
    if not user:
        user = get_opened_entity(entity=User, username=data['username'], archived=False, select='first')

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.public_id)

        response = jsonify({'status':1,
                            'access_token':access_token})

        set_access_cookies(response, access_token)

        return response
        
    
    return jsonify({'status':0,
                    'message':'Username or Password is invalid.'})
    
    

def save_user(data, get_opened_entity):
    exist = get_opened_entity(entity=User, email=data['email'], archived=False, select='first')

    if not exist:
        exist = get_opened_entity(entity=User, username=data['username'], archived=False, select='first')

    if exist:
        return jsonify({'status':0,
                        'message':'Email or Username invalid.'})
    
    user = User(public_id=str(uuid4()), email=data['email'], username=data['username'], password=data['password'],
                first_name=data['first_name'], last_name=data['last_name'])
    
    db.session.add(user)
    db.session.commit()

    return jsonify({'status':1,
                    'message':f'{user.first_name} {user.last_name} registered as {user.username}.'})

def social_media_authenticate(platform, get_opened_identity):
    info = {'google':(google, '/oauth2/v2/userinfo', 'email'),
            'facebook':(facebook, '/me?fields=id,name,email', 'email'),
            'slack':(slack, '/api/users.identity', ('user', 'email'))}

    platform_object, endpoint, email_args = info[platform]

    if not platform_object.authorized:
        return jsonify({'status': 0,
                        'message': f'{platform.title()} account does not exist.'})

    response = platform_object.get(endpoint)

    user = get_opened_identity(entity=User, email=response.json()[email_args], select='first')

    if not user:
        return jsonify({'status': 0,
                        'message': 'Email does not exist in the database.'})
    
    if user.verified:
        return jsonify({'status': 0,
                        'message': 'User is already verified.'})
    
    user.verified = True
    db.session.commit()

    access_token = create_access_token(identity=user.public_id)
    set_access_cookies(response, access_token)

    return jsonify({'status': 1,
                    'message': f'Email {user.email} successfully verified.',
                    'access_token':access_token})