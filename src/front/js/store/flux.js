import { exampleStore, exampleActions } from "./exampleStore.js"; //destructured import
import { usuarioStore, usuarioActions } from "./usuario.js";
import { favoritosStore, favoritosActions } from "./favoritos.js";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      ...exampleStore, //this brings here the variables exampleArray and exampleObject
      ...usuarioStore,
      ...favoritosStore,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const store = getStore();
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ ...store, message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      ...exampleActions(getStore, getActions, setStore), //this will brings here the function exampleFunction, and it will be able to use store's states and actions
      ...usuarioActions(getStore, getActions, setStore),
      ...favoritosActions(getStore, getActions, setStore),
      useFetch: async (endpoint, body = "", method = "GET") => {
        let url = "https://www.swapi.tech/api" + endpoint;
        console.log(url);
        console.log(body);
        let response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: body ? JSON.stringify(body) : null,
        });

        let respuestaJson = await response.json();

        return { respuestaJson, response };
      },
      useSwapi: async (endpoint, method = "GET") => {
        let url = "https://www.swapi.tech/api" + endpoint;
        let response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: null,
        });

        let respuestaJson = await response.json();

        return { respuestaJson, response };
      },
    },
  };
};

export default getState;
