export const exampleStore = {
  exampleArray: [],
  exampleObj: {
    msg: "I'm an object",
  },
  userLogin: false,
  user: {},
};

export function exampleActions(getStore, getActions, setStore) {
  return {
    login: async (email, password) => {
      const actions = getActions();
      console.log(
        "Es la encargada de hacer login del usuario",
        email,
        password
      );
      let obj = {
        email: email,
        password: password,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/login",
        obj,
        "POST"
      );
      console.log(response.ok);
      console.log(respuestaJson);
      if (response.ok) {
        localStorage.setItem("token", respuestaJson.token);
        sessionStorage.setItem("token", respuestaJson.token);
        let token = localStorage.getItem("token");
        setStore({ ...getStore(), userLogin: true });
        //console.log("token", token)
      } else {
        console.log("login fallido");
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...getStore(), userLogin: false });
      }

      return { respuestaJson, response };
    },
    userToDo: (nuevoUser) => {
      const store = getStore();
      setStore({ ...store, user: nuevoUser });
    },
    register: async (firstName, lastName, email, password) => {
      const actions = getActions();
      console.log(
        "Es la encargada de registrar el usuario",
        firstName,
        lastName,
        email,
        password
      );
      let obj = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/register",
        obj,
        "POST"
      );
      console.log(response.ok);
      console.log(respuestaJson);
      if (response.ok) {
        localStorage.setItem("token", respuestaJson.token);
        sessionStorage.setItem("token", respuestaJson.token);
        let token = localStorage.getItem("token");
        setStore({ ...getStore(), userLogin: true });
        //console.log("token", token)
      } else {
        console.log("registro fallido");
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...getStore(), userLogin: false });
      }

      return { respuestaJson, response };
    },
  };
}
