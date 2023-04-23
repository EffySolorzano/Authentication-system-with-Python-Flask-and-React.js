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


### USER ####

@api.route('/user', methods=['GET'])
def handle_user():
    users = User.query.all()
    users = list(map(lambda item: item.serialize(), users))
    print(users)

    return jsonify(users), 200 

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200

@api.route('/users/<string:name>', methods=['GET'])
def get_specific_user(name):
    user = User.query.get(name)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    serialized_user = user.serialize()
    return jsonify(serialized_user), 200

@api.route('/get-user', methods=['POST'])
def get_specific_user2():
    body = request.get_json()   
    name = body["name"]

    user = User.query.get(id)   
  
    return jsonify(user.serialize()), 200

@api.route('/get-user', methods=['DELETE'])
def delete_specific_user():
    body = request.get_json()   
    name = body["name"]

    user = User.query.get(id) 

    db.session.delete(user)
    db.session.commit()  
  
    return jsonify("Usuario borrado"), 200

@api.route('/get-user', methods=['PUT'])
def edit_user():
    body = request.get_json()   
    name = body["name"]

    user = User.query.get(id)   
    user.name = name #modifique el nombre del usuario

    db.session.commit()
  
    return jsonify(user.serialize()), 200


###sign-in/register/logout####    

@api.route('/register', methods=['POST'])
def register_user():
    #recibir el body en json, des-jsonificarlo y almacenarlo en la variable body
    body = request.get_json() #request.json() pero hay que importar request y json

    #ordernar cada uno de los campos recibidos
    email = body["email"]
    fullname = body["fullname"]
    username = body["username"]
    password = body["password"]
    is_active = body["is_active"]

    #validaciones
    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400)
    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)

    #creada la clase User en la variable new_user
    new_user = User(email=email, fullname=fullname, username=username, password=password, is_active=is_active)

    #comitear la sesión
    db.session.add(new_user) #agregamos el nuevo usuario a la base de datos
    db.session.commit() #guardamos los cambios en la base de datos

    return jsonify({"mensaje":"User successfully created"}), 201 

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
        
@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_raw_jwt()['jti']
    try:
        revoked_token = RevokedTokenModel(jti=jti)
        revoked_token.add()
        return jsonify({"message": "You have been logged out."}), 200
    except:
        return jsonify({"message": "Something went wrong"}), 500

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    token = verificacionToken(get_jwt()["jti"]) #reuso la función de verificacion de token
    if token:
       raise APIException('Token está en lista negra', status_code=404)

    print("EL usuario es: ", user.name)
    return jsonify({"message":"Estás en una ruta protegida"}), 200


###STAR WARS Characters     

@api.route('/add', methods=[ 'POST' ])
def add_people():
    body = request.get_json()
    name = body["name"]
    height = body["height"]
    mass = body["mass"]
    hair_color = body["hair_color"]

    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400)
    if "name" not in body:
        raise APIException("You need to specify the name", status_code=400)
    if  "height" not in body:
        raise APIException("You need to specify the height", status_code=400)
    if  "mass" not in body:
        raise APIException("You need to specify the mass", status_code=400)
    if  "hair_color" not in body:
        raise APIException("You need to specify the hair_color", status_code=400)

    # create a new People object with the data provided
    new_person = People(name=name, height=height, mass=mass, hair_color=hair_color)

    # add the new person to the database and commit changes
    db.session.add(new_person)
    db.session.commit()

    return jsonify({"message": "New character added"}), 201

@api.route('/get-person/<string:name>', methods = [ 'GET' ])
def get_specific_person(name):
    person = People.query.filter_by(name=name).first()
    if person:
        return jsonify(person.serialize()), 200
    else:
        raise APIException('Person not found', status_code=404)

    
@api.route('/edit-person/<string:name>', methods=['PUT'])
def people_edit(name):
    body = request.get_json()   
    new_name = body["name"]
    new_height = body["height"]
    new_mass= body["mass"]
    new_hair_color= body["hair_color"]

    person = People.query.filter_by(name=name).first()  
    person.name = new_name
    person.height = new_height
    person.mass = new_mass
    person.hair_color = new_hair_color


    db.session.commit()
  
    return jsonify(person.serialize()), 200

@api.route('/delete-people', methods=['DELETE'])
def delete_people():
    body = request.get_json()   
    name = body["name"]

    person = People.query.filter_by(name=name).first()
    person.name = name

    db.session.delete(person)
    db.session.commit()  
  
    return jsonify("Character deleted successfully"), 200
    
### PLANETS     

@api.route('/add-planet', methods=['POST'])
def add_planet():
    body = request.get_json()
    name = body["name"]
    diameter = body["diameter"]
    rotation_period = body["rotation_period"]
    orbital_period = body["orbital_period"]
    gravity = body["gravity"]

    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400)
    if "name" not in body:
        raise APIException("You need to specify the name", status_code=400)
    if  "diameter" not in body:
        raise APIException("You need to specify the diameter", status_code=400)
    if "rotation_period" not in body:
        raise APIException("You need to specify the rotation period", status_code=400)     
    if  "orbital_period" not in body:
        raise APIException("You need to specify the orbital period", status_code=400)
    if  "gravity" not in body:
        raise APIException("You need to specify the gravity", status_code=400)   

    # create a new People object with the data provided
    new_planet = Planets(name=name, diameter=diameter, rotation_period=rotation_period, orbital_period=orbital_period, gravity=gravity)

    # add the new person to the database and commit changes
    db.session.add(new_planet)
    db.session.commit()

    return jsonify({"message": "New planet added"}), 201

@api.route('/get-planet/<string:name>', methods = [ 'GET' ])
def get_specific_planet(name):
    planet = Planets.query.filter_by(name=name).first()
    if planet:
        return jsonify(planet.serialize()), 200
    else:
        raise APIException('Planet not found', status_code=404)

@api.route('/edit-planet/<string:name>', methods=['PUT'])
def planet_edit(name):
    body = request.get_json()   
    new_name = body["name"]
    new_diameter = body["diameter"]
    new_rotation_period= body["rotation_period"]
    new_orbital_period= body["orbital_period"]
    new_gravity= body["gravity"]

    planet = Planets.query.filter_by(name=name).first()  
    planet.name = new_name
    planet.diameter = new_diameter
    planet.rotation_period = new_rotation_period
    planet.orbital_period = new_orbital_period
    planet.gravity = new_gravity


    db.session.commit()
  
    return jsonify(planet.serialize()), 200

@api.route('/delete-planet', methods=['DELETE'])
def delete_planet():
    body = request.get_json()   
    name = body["name"]

    planet = Planets.query.filter_by(name=name).first()
    planet.name = name

    db.session.delete(planet)
    db.session.commit()  
  
    return jsonify("Planet deleted successfully"), 200

### STARSHIPS 

@api.route('/add-starship', methods=['POST'])
def add_starship():
    body = request.get_json()
    model = body["model"]
    starship_class = body["starship_class"]
    manufacturer = body["manufacturer"]
    cost_in_credits = body["cost_in_credits"]
    length = body["length"]

    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400)
    if "model" not in body:
        raise APIException("You need to specify the model", status_code=400)
    if  "starship_class" not in body:
        raise APIException("You need to specify the starship class", status_code=400)
    if "manufacturer" not in body:
        raise APIException("You need to specify the manufacturer", status_code=400)     
    if  "cost_in_credits" not in body:
        raise APIException("You need to specify the cost in credits", status_code=400)
    if  "length" not in body:
        raise APIException("You need to specify the length", status_code=400)   

    # create a new People object with the data provided
    new_starship = Starships(model=model, starship_class=starship_class, manufacturer=manufacturer, cost_in_credits=cost_in_credits, length=length)

    # add the new person to the database and commit changes
    db.session.add(new_starship)
    db.session.commit()

    return jsonify({"message": "New starship added"}), 201

@api.route('/get-starship/<string:name>', methods = [ 'GET' ])
def get_specific_starship(name):
    starship = Starships.query.filter_by(model=name).first()
    if starship:
        return jsonify(starship.serialize()), 200
    else:
        raise APIException('Starship not found', status_code=404)

@api.route('/edit-starship/<string:name>', methods=['PUT'])
def starship_edit(name):
    body = request.get_json()   
    new_model = body["model"]
    new_starship_class = body["starship_class"]
    new_manufacturer= body["manufacturer"]
    new_cost_in_credits= body["cost_in_credits"]
    new_length= body["length"]

    starship = Starships.query.filter_by(model=name).first()  
    starship.model = new_model
    starship.starship_class = new_starship_class
    starship.manufacturer = new_manufacturer
    starship.cost_in_credits = new_cost_in_credits
    starship.length = new_length


    db.session.commit()
  
    return jsonify(starship.serialize()), 200

@api.route('/delete-starship', methods=['DELETE'])
def delete_starship():
    body = request.get_json()   
    model = body["model"]

    starship = Starships.query.filter_by(model=model).first()
    starship.model = model

    db.session.delete(starship)
    db.session.commit()  
  
    return jsonify("Starship deleted successfully"), 200

## **************FAVORITES************

@api.route('/favorites', methods=['POST'])
@jwt_required()
def list_favorites():
    body = request.get_json()
    user_id = body["user_id"]
    if not user_id:
        raise APIException('Data missing', status_code=404)
    
    user = User.query.get(user_id)

    if not user:
        raise APIException('User Not Found', status_code=404)

    user_favorites = FavoritePeople.query.filter_by(user_id = user.id).all() #nos devuelve todas las coincidencias
    user_favorites_final = list(map(lambda item: item.serialize(), user_favorites))

    user_favorites_planets = FavoritePlanet.query.filter_by(user_id = user.id).all()
    user_favorites_final_planets = list(map(lambda item: item.serialize(), user_favorites_planets))

    user_favorites_vehicles = FavoriteVehicle.query.filter_by(user_id = user.id).all()
    user_favorites_final_vehicles = list(map(lambda item: item.serialize(), user_favorites_vehicles))
    
    user_favorites_final = user_favorites_final + user_favorites_final_planets + user_favorites_final_vehicles

    return jsonify(user_favorites_final), 201
