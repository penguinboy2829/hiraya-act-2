from flask import Flask
from extensions import migrate, jwt
from routes.blueprint import bp, google_bp, facebook_bp, slack_bp
from model.init_db import db

def create_app():
    app = Flask(__name__)
    app.config.from_object('config')
 
    jwt.init_app(app)
    
    with app.test_request_context():
        db.init_app(app)
        
    with app.app_context():
        db.create_all()
    
    return app

app = create_app()
app.register_blueprint(bp)
app.register_blueprint(google_bp)
app.register_blueprint(facebook_bp)
app.register_blueprint(slack_bp)
migrate.init_app(app, db)

if __name__ == '__main__':
    app.run()