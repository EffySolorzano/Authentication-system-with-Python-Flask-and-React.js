import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import GalaticRepublic from "../../img/GalaticRepublic.jpeg";

const SinglePlanet = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/planets/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setPlanet(respuestaJson.result.properties);
      }
    };
    cargaDatos();
  }, [params.uid]);

  return (
    <div className="card col-md-12">
      <div className="card-body">
        <img className="planet-img" src={GalaticRepublic} alt="planet-img" />
        <h4 className="card-title text-center">
          {planet.name ? planet.name : ""}
        </h4>
        <p className="card-text" id="people-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
          pulvinar tortor. Integer sit amet ornare dui. Suspendisse in aliquam
          felis, ut viverra ipsum. Cras tempor tortor quis ipsum mattis, non
          pulvinar sem sodales. Maecenas interdum condimentum turpis at
          tincidunt. Morbi rutrum finibus mollis. Sed dictum bibendum dui,
          pretium ullamcorper lacus sodales eu.
        </p>
        <footer>
          <p className="text-danger mt-10">
            <span>
              Diameter: {planet.diameter ? planet.diameter : "Unknown"}
            </span>
            <span>
              Rotation Period:{" "}
              {planet.rotation_period ? planet.rotation_period : "Unknown"}
            </span>
            <span>
              Orbital Period:{" "}
              {planet.orbital_period ? planet.orbital_period : "Unknown"}
            </span>
            <span>Gravity: {planet.gravity ? planet.gravity : "Unknown"}</span>
            <span>
              Population: {planet.population ? planet.population : "Unknown"}
            </span>
            <span>Climate: {planet.climate ? planet.climate : "Unknown"}</span>
            <span>Terrain: {planet.terrain ? planet.terrain : "Unknown"}</span>
            <span>
              Surface Water:{" "}
              {planet.surface_water ? planet.surface_water : "Unknown"}
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

export default SinglePlanet;
