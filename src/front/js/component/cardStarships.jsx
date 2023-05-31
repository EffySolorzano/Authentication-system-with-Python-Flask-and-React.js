import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Rebel from "../../img/rebel.jpeg";

const CardStarships = (props) => {
  const { store, actions } = useContext(Context);
  const addStarship = () => {
    const starshipData = {
      model: props.name,
      starship_class: props.starship_class || "",
      manufacturer: props.manufacturer || "",
      cost_in_credits: props.cost_in_credits || "",
      length: props.length || "",
    };

    actions.addStarship(starshipData);
  };
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`https://starwars-visualguide.com/assets/img/starships/${props.uid}.jpg`}
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
          <Link to={`/starships/${props.uid}`} className="btn btn-outline-dark">
            Learn More!
          </Link>
          <button
            className="btn btn-transparent btn-outline-warning add"
            onClick={addStarship}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button
            className="btn btn-outline-warning"
            id="heart"
            onClick={() => {
              actions.agregarFavorito({
                name: props.name,
                uid: props.uid,
                category: "starships",
                link: `/starships/${props.uid}`,
              });
            }}
          >
            <i className="fa-solid fa-heart text-outline-warning"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardStarships;
