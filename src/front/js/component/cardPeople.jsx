import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Jedi from "../../img/jedi.jpeg";

const CardPeople = (props) => {
  const { store, actions } = useContext(Context);

  const handleAddFavorite = () => {
    console.log("Username in handleAddFavorite:", store.username);
    actions.agregarFavorito(
      {
        name: props.name,
        uid: props.uid,
        category: "people",
        link: `/people/${props.uid}`,
      },
      store.username
    );
  };

  const addPeople = () => {
    const characterData = {
      name: props.name,
      height: props.height || "", // Provide a default value if the property is missing
      mass: props.mass || "", // Provide a default value if the property is missing
      hair_color: props.hair_color || "", // Provide a default value if the property is missing
      eye_color: props.eye_color || "", // Provide a default value if the property is missing
    };

    actions.addPeople(characterData);
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
          }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Link to={`/people/${props.uid}`} className="btn btn-outline-dark">
            Learn More!
          </Link>
          <button
            className="btn btn-transparent btn-outline-warning add"
            onClick={addPeople} // Call the addPeople function when the button is clicked
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button
            className="btn btn-outline-warning"
            id="heart"
            onClick={handleAddFavorite}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardPeople;
