import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import GalaticRepublic from "../../img/GalaticRepublic.jpeg";

const CardPlanet = (props) => {
  const { store, actions } = useContext(Context);

  const addPlanet = () => {
    const planetData = {
      name: props.name,
      diameter: props.diameter || "",
      rotation_period: props.rotation_period || "",
      orbital_period: props.orbital_period || "",
      gravity: props.gravity || "",
    };

    actions.addPlanet(planetData);
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`https://starwars-visualguide.com/assets/img/planets/${props.uid}.jpg`}
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
          <Link to={`/planet/${props.uid}`} className="btn btn-outline-dark">
            Learn More!
          </Link>
          <button
            className="btn btn-transparent btn-outline-warning add"
            onClick={addPlanet}
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
                category: "planets",
                link: `/planets/${props.uid}`,
              });
            }}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardPlanet;
