import os
import sys
from model.init_db import db, url

SECRET_KEY = 'hirayamnl'

dir_path = os.path.dirname(os.path.realpath(__file__))

sys.path.append(dir_path)

DEBUG = True

SQLALCHEMY_DATABASE_URI = url

SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_PERMANENT = True

SESSION_TYPE = 'sqlalchemy'

SESSION_SQLALCHEMY = db

JSON_SORT_KEYS = False