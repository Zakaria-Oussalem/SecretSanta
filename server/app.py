from enum import Enum
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import numpy as np

from core.random_selection import selection

app = Flask(__name__)

# Configure your Flask app here (e.g., database URI)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://secret_user:255241@localhost/secret_db"
)

db = SQLAlchemy(app)
# CORS
CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    role = db.Column(db.String(20))
    session = db.Column(db.Integer, nullable=False)
    attributed = db.Column(db.String(20))
    __tablename__ = "users"

    def __init__(self, username, role, session, attributed):
        self.username = username
        self.role = role
        self.session = session
        self.attributed = attributed


@app.route("/")
def hello():
    return "Hello World!"


# create a user
@app.route("/user", methods=["POST"])
def create_user():
    username = request.json["username"]
    role = request.json["role"]
    session = request.json.get("session_id", None)
    if User.query.filter_by(username=username).first():
        return {"error": "Username already exists"}
    if role not in ["admin", "user"]:
        return {"error": "Invalid role"}
    if not session:
        while True:
            session = np.random.randint(100000, 200000)
            if not User.query.filter_by(session=session).first():
                break
    user = User(username, role, session, attributed=None)
    db.session.add(user)
    db.session.commit()

    return {"username": username, "role": role, "session": session}


# get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = list(
        map(
            lambda x: {"username": x.username, "role": x.role, "session": x.session},
            users,
        )
    )
    return {"users": users}


# get all users by session
@app.route("/session/<session_id>", methods=["GET"])
def get_users_session(session_id):
    users = User.query.filter_by(session=session_id).all()
    users = list(
        map(
            lambda x: {
                "id": x.id,
                "username": x.username,
                "role": x.role,
                "attributed": x.attributed,
            },
            users,
        )
    )
    return {"users": users}


# get a user by id
@app.route("/users/<id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    return {
        "id": user.id,
        "username": user.username,
        "role": user.role,
        "session": user.session,
        "attributed": user.attributed,
    }


# delete a user by id
@app.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return {"id": id}


# delete all users
@app.route("/users", methods=["DELETE"])
def delete_all_users():
    users = User.query.all()
    for user in users:
        db.session.delete(user)
    db.session.commit()
    return {"message": "all users deleted"}


# launch secret santa
@app.route("/launch", methods=["POST"])
def launch():
    session = request.json["session"]
    users = User.query.filter_by(session=session).all()
    users = list(map(lambda x: x.id, users))
    results = selection(users)
    for user in results.keys():
        u = User.query.get(user)
        u.attributed = User.query.get(results[user]).username
    db.session.commit()
    return results


# get attributed user
@app.route("/attributed/<id>", methods=["GET"])
def get_attributed(id):
    user = User.query.get(id)
    return {"attributed": user.attributed, "username": user.username}


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()
