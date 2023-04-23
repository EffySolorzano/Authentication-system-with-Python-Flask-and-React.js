"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, People, Planets, Starships, Favorites, TokenBlockedList
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from datetime import date, time, datetime, timezone, timedelta

from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

def verificacionToken(jti):
    jti#Identificador del JWT (es más corto)
    print("jit", jti)
    token = TokenBlockedList.query.filter_by(token=jti).first()

    if token is None:
        return False
    
    return True


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/')
def sitemap():
    return generate_sitemap(app)

@api.route('/user', methods=['GET'])
def handle_user():
    users = User.query.all()
    users = list(map(lambda item: item.serialize(), users))
    print(users)

    return jsonify(users), 200 

@api.route('/register', methods=['POST'])
def register():
    # recibir el body en json, des-jsonificarlo y almacenarlo en la variable body
    body = request.get_json()

    # validaciones
    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400)

    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)

    # ordernar cada uno de los campos recibidos
    fullname = body["fullname"]
    email = body["email"]
    username = body["username"]
    password = body["password"]
    is_active = body["is_active"]

    # creada la clase User en la variable new_user
    new_user = User(email=email, fullname=fullname, username=username, password=password, is_active=is_active)

    # comitear la sesión
    db.session.add(new_user)
    db.session.commit()

    # devolver el nuevo usuario creado
    return jsonify({"message": "User successfully created", "user": new_user.to_dict()}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email=body["email"]
    password = body["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"message":"Login failed"}), 401

    #validar el password encriptado
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message":"Login failed"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token":access_token}), 200
        