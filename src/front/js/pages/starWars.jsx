import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CardPeople from "../component/cardPeople.jsx";
import CardPlanets from "../component/cardPlanets.jsx";
import CardStarships from "../component/cardStarships.jsx";

const StarWars = () => {
  const { store, actions } = useContext(Context);
  const [listPeople, setListPeople] = useState([1, 2, 3, 4]);
  const [listPlanet, setListPlanet] = useState([]);
  const [listStarships, setListStarships] = useState([]);

  //se ejecuta la primera vez que se reenderiza el componente
  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch("/people");
      if (response.ok) {
        console.log(respuestaJson);
        setListPeople(respuestaJson.results);
      }
    };
    cargaDatos();

    const loadPlanet = async () => {
      let { respuestaJson, response } = await actions.useFetch("/planets");
      if (response.ok) {
        console.log(respuestaJson);
        setListPlanet(respuestaJson.results);
      }
    };
    loadPlanet();

    const loadStarships = async () => {
      let { respuestaJson, response } = await actions.useFetch("/starships");
      if (response.ok) {
        console.log(respuestaJson);
        setListStarships(respuestaJson.results);
      }
    };
    loadStarships();
  }, []);

  return (
    <>
      <br />
      <img
        className="characters"
        src="https://see.fontimg.com/api/renderfont4/0l3d/eyJyIjoiZnMiLCJoIjo4MCwidyI6MjAwMCwiZnMiOjQwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Q2hhcmFjdGVycw/sf-distant-galaxy.png"
        alt="Star Wars fonts"
      />
      <div className="container-fluid">
        <div className="row">
          {listPeople && listPeople.length > 0 && (
            <>
              {listPeople.map((item, index) => (
                <div className="col-md-3" key={item.uid}>
                  <CardPeople name={item.name} uid={item.uid} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <img
        className="planets"
        src="https://see.fontimg.com/api/renderfont4/0l3d/eyJyIjoiZnMiLCJoIjo4MCwidyI6MjAwMCwiZnMiOjQwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UGxhbmV0cw/sf-distant-galaxy.png"
        alt="Star Wars fonts"
      />
      <div className="container-fluid">
        <div className="row">
          {listPlanet && listPlanet.length > 0 && (
            <>
              {listPlanet.map((item, index) => (
                <div className="col-md-3" key={item.uid}>
                  <CardPlanets name={item.name} uid={item.uid} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <img
        className="starships"
        src="https://see.fontimg.com/api/renderfont4/0l3d/eyJyIjoiZnMiLCJoIjo4MCwidyI6MjAwMCwiZnMiOjQwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/U3RhcnNoaXBz/sf-distant-galaxy.png"
        alt="Star Wars fonts"
      />
      <div className="container-fluid">
        <div className="row">
          {listStarships && listStarships.length > 0 && (
            <>
              {listStarships.map((item, index) => (
                <div className="col-md-3" key={item.uid}>
                  <CardStarships name={item.name} uid={item.uid} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StarWars;
