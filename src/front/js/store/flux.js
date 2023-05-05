import { userStore, userActions } from "./exampleStore.js";

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
      ...userStore,
      ...userActions,
    },
    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          const store = getStore();
          const response = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await response.json();
          setStore({ ...store, message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo });
      },

      ...userActions(getStore, getActions, setStore),

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
    },
    useLocalFetch: async (endpoint, body = "", method = "GET") => {
      let url = "http://127.0.0.1:3001/api" + endpoint;
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
  };
};

export default getState;
