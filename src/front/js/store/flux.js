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
    },
    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
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
        setStore({ demo: demo });
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
