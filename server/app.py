from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configure your Flask app here (e.g., database URI)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://secret_user:255241@localhost/secret_db"

db = SQLAlchemy(app)
CORS(app)


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    limit = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20))

    def __init__(self, limit, status):
        self.limit = limit
        self.status = status

    def __repr__(self):
        return "<Session has as limit %r and as status %r>" % self.id % self.status


def session_output(session):
    return {
        "id": session.id,
        "limit": session.limit,
        "status": session.status,
    }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    role = db.Column(db.String(20))
    # the session Id is a foreign key to the session table
    # sessionID = db.Column(
    #     db.Integer, db.ForeignKey("Session.id", ondelete="CASCADE"), nullable=False
    # )

    def __init__(self, username, role):
        self.username = username
        self.role = role

    def __repr__(self):
        return "<Users %r>" % self.username


@app.route("/")
def hello():
    return "Hello World!"


# create a session
@app.route("/session", methods=["POST"])
def create_session():
    limit = request.json["limit"]
    session = Session(limit, "active")
    db.session.add(session)
    db.session.commit()

    return session_output(session)


# get all sessions
@app.route("/sessions", methods=["GET"])
def get_sessions():
    sessions = Session.query.all()
    sessions = list(map(lambda x: session_output(x), sessions))
    return {"sessions": sessions}


# get a session by id
@app.route("/sessions/<id>", methods=["GET"])
def get_session(id):
    session = Session.query.get(id)
    return session_output(session)


# delete a session by id
@app.route("/sessions/<id>", methods=["DELETE"])
def delete_session(id):
    session = Session.query.get(id)
    db.session.delete(session)
    db.session.commit()
    return {"id": id}


# update a session by id
@app.route("/sessions/<id>", methods=["PUT"])
def update_session(id):
    session = Session.query.get(id)
    session.limit = request.json["limit"]
    session.status = request.json["status"]
    db.session.commit()
    return session_output(session)


# create a user
@app.route("/users", methods=["POST"])
def create_user():
    username = request.json["username"]
    role = request.json["role"]
    user = User(username, role)
    db.session.add(user)
    db.session.commit()

    return {"username": username, "role": role}


# get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = list(map(lambda x: {"username": x.username, "role": x.role}, users))
    return {"users": users}


# get a user by id
@app.route("/users/<id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    return {"username": user.username, "role": user.role}


# delete a user by id
@app.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return {"id": id}


# update a user by id
@app.route("/users/<id>", methods=["PUT"])
def update_user(id):
    user = User.query.get(id)
    user.username = request.json["username"]
    user.role = request.json["role"]
    db.session.commit()
    return {"username": user.username, "role": user.role}


if __name__ == "__main__":
    app.run()
