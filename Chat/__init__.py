import os
from flask import Flask
from flask_cors import CORS
from .models import database
from .cli import init_database_command
from .views import bp
from .sockets import socketio
from .auth import login_manager

app = Flask(__name__)
app.config.from_pyfile('config.py')
try:
    os.makedirs(app.instance_path)
except OSError:
    pass
CORS(app)

database.init_app(app)
login_manager.init_app(app)
app.cli.add_command(init_database_command)

app.register_blueprint(bp)

socketio.init_app(app)
