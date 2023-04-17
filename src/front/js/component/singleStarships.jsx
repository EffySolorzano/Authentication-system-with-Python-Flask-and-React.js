import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Rebel from "../../img/rebel.jpeg";

const SingleStarships = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [starship, setStarship] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/starships/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setStarship(respuestaJson.result.properties);
      }
    };
    cargaDatos();
  }, [params.uid]);

  return (
    <div className="card col-md-12">
      <div className="card-body">
        <img className="starship-img" src={Rebel} alt="starship-img" />
        <h4 className="card-title text-center">
          {starship.name ? starship.name : ""}
        </h4>
        <p className="card-text" id="starship-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
          pulvinar tortor. Integer sit amet ornare dui. Suspendisse in aliquam
          felis, ut viverra ipsum. Cras tempor tortor quis ipsum mattis, non
          pulvinar sem sodales. Maecenas interdum condimentum turpis at
          tincidunt. Morbi rutrum finibus mollis. Sed dictum bibendum dui,
          pretium ullamcorper lacus sodales eu.
        </p>
        <footer>
          <p className="text-danger">
            <span>Model: {starship.model ? starship.model : "Unknown"}</span>
            <span>
              Starship Class:{" "}
              {starship.starship_class ? starship.starship_class : "Unknown"}
            </span>
            <span>
              Manufacturer:{" "}
              {starship.manufacturer ? starship.manufacturer : "Unknown"}
            </span>
            <span>
              Cost in credits:{" "}
              {starship.cost_in_credits ? starship.cost_in_credits : "Unknown"}
            </span>
            <span>Length: {starship.length ? starship.length : "Unknown"}</span>
            <span>Crew: {starship.crew ? starship.crew : "Unknown"}</span>
            <span>
              Passengers:{" "}
              {starship.passengers ? starship.passengers : "Unknown"}
            </span>
            <span>
              Max atmosphering speed:{" "}
              {starship.max_atmosphering_speed
                ? starship.max_atmosphering_speed
                : "Unknown"}
            </span>
            <span>
              Hyperdrive rating:{" "}
              {starship.hyperdrive_rating
                ? starship.hyperdrive_rating
                : "Unknown"}
            </span>
            <span>MGLT: {starship.MGLT ? starship.MGLT : "Unknown"}</span>
            <span>
              Cargo capacity:{" "}
              {starship.cargo_capacity ? starship.cargo_capacity : "Unknown"}
            </span>
            <span>
              Consumables:{" "}
              {starship.consumables ? starship.consumables : "Unknown"}
            </span>
          </p>
        </footer>

        <Link to="/" className="btn btn-warning">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default SingleStarships;
