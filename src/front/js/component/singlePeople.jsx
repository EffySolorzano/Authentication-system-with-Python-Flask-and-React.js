import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Jedi from "../../img/jedi.jpeg";

const SinglePeople = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [people, setPeople] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/people/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setPeople(respuestaJson.result.properties);
      }
    };
    cargaDatos();
  }, [params.uid]);

  return (
    <div className="card col-md-12">
      <div className="card-body">
        <img className="people-img" src={Jedi} alt="people-img" />
        <h4 className="card-title text-center">
          {people.name ? people.name : ""}
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
            <span>Gender: {people.gender ? people.gender : "Unknown"}</span>
            <span>Height: {people.height ? people.height : "Unknown"}</span>
            <span>Mass: {people.mass ? people.mass : "Unknown"}</span>
            <span>
              Hair color: {people.hair_color ? people.hair_color : "Unknown"}
            </span>
            <span>
              Eye color: {people.eye_color ? people.eye_color : "Unknown"}
            </span>
            <span>
              Skin color: {people.skin_color ? people.skin_color : "Unknown"}
            </span>
            <span>
              Birth year: {people.birth_year ? people.birth_year : "Unknown"}
            </span>
            <span>Gender: {people.gender ? people.gender : "Unknown"}</span>
          </p>
        </footer>
        <Link to="/" className="btn btn-warning">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default SinglePeople;
