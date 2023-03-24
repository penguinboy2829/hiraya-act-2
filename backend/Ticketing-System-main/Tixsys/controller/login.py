from model.user.crud import verify_user, create_user

def login_user():
    response = verify_user()

    return response

def register_user():
    response = create_user()

    return response