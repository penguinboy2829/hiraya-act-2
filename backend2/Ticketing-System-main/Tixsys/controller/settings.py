from model.settings.crud import cache_user, quit_user

def archive_user(**kwargs):
    response = cache_user(kwargs)

    return response

def logout_user():
    response = quit_user()

    return response