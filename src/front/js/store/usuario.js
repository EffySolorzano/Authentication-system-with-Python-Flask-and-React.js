import jwt_decode from "jwt-decode";

export const usuarioStore = {
  listaUsuarios: [],
  usuario: {
    msg: "I'm an object",
  },
  user: "",
  userLogin: false,
  usersData: [],
  userFavorites: [],
};

export function usuarioActions(getStore, getActions, setStore) {
  return {
    login: async (email, password) => {
      const store = getStore();
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
        setStore({ ...store, userLogin: true });
        //console.log("token", token)
      } else {
        console.log("login fallido");
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...store, userLogin: false });
      }

      return { respuestaJson, response };
    },
    getUserFavorites: async () => {
      const store = getStore();
      const actions = getActions();

      // Get the userId from the token in localStorage
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;

      // Call the useFetch() function with the userId
      let { respuestaJson, response } = await actions.useFetch(
        `/favorites/${userId}`
      );

      if (response.ok) {
        setStore({ ...store, userFavorites: respuestaJson.all_favorites });
      } else {
        console.log("fetch fallido");
      }

      return { respuestaJson, response };
    },
    addPeopleFavorite: async (item) => {
      let store = getStore();
      let actions = getActions();

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(item);
      let obj = {
        user_id: userId,
        people_id: item.id,
      };

      const nameExists = store.userFavorites.some(
        (favorite) => favorite.name === item.name
      );
      if (nameExists) {
        alert(`"${item.name}" already exists in favorites.`);
        return;
      }

      let { respuestaJson, response } = await actions.useFetch(
        "/favorite/people",
        obj,
        "POST"
      );

      if (response.ok) {
        actions.getUserFavorites();
      }

      return;
    },
    addPlanetFavorite: async (item) => {
      let store = getStore();
      let actions = getActions();

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(item);
      let obj = {
        user_id: userId,
        planet_id: item.id,
      };

      const nameExists = store.userFavorites.some(
        (favorite) => favorite.name === item.name
      );
      if (nameExists) {
        alert(`"${item.name}" already exists in favorites.`);
        return;
      }

      let { respuestaJson, response } = await actions.useFetch(
        "/favorite/planet",
        obj,
        "POST"
      );

      if (response.ok) {
        actions.getUserFavorites();
      }

      return;
    },
    addVehicleFavorite: async (item) => {
      let store = getStore();
      let actions = getActions();

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(item);
      let obj = {
        user_id: userId,
        vehicle_id: item.id,
      };

      const nameExists = store.userFavorites.some(
        (favorite) => favorite.name === item.name
      );
      if (nameExists) {
        alert(`"${item.name}" already exists in favorites.`);
        return;
      }

      let { respuestaJson, response } = await actions.useFetch(
        "/favorite/vehicle",
        obj,
        "POST"
      );

      if (response.ok) {
        actions.getUserFavorites();
      }

      return;
    },
    removePeopleFavorite: async (item) => {
      let store = getStore();
      let actions = getActions();

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(item);
      let obj = {
        user_id: userId,
        people_id: item.id,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/favorite/people",
        obj,
        "DELETE"
      );

      if (response.ok) {
        actions.getUserFavorites();
      }

      return;
    },
    removePlanetFavorite: async (item) => {
      let store = getStore();
      let actions = getActions();

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(item);
      let obj = {
        user_id: userId,
        planet_id: item.id,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/favorite/planet",
        obj,
        "DELETE"
      );

      if (response.ok) {
        actions.getUserFavorites();
      }

      return;
    },
    removeVehicleFavorite: async (item) => {
      let store = getStore();
      let actions = getActions();

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(item);
      let obj = {
        user_id: userId,
        vehicle_id: item.id,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/favorite/vehicle",
        obj,
        "DELETE"
      );

      if (response.ok) {
        actions.getUserFavorites();
      }

      return;
    },
    logout: async () => {
      const store = getStore();
      const actions = getActions();
      let body = "";
      let { respuestaJson, response } = await actions.useFetch(
        "/logout",
        body,
        "POST"
      );
      if (response.ok) {
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...store, userLogin: false });
      }
      return respuestaJson;
    },
    register: async (name, email, password, isActive) => {
      const store = getStore();
      const actions = getActions();
      console.log(
        "Es la encargada de hacer login del usuario",
        email,
        password
      );
      let obj = {
        name: name,
        email: email,
        password: password,
        is_active: isActive,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/register",
        obj,
        "POST"
      );
      console.log(response.ok);
      console.log(respuestaJson);
      if (response.ok) {
        alert("Usuario Registrado");
      } else {
        alert("Registro fallido");
      }

      return response;
    },
    addPeople: async (name, birthdate, eyes, height) => {
      const store = getStore();
      const actions = getActions();
      let obj = {
        name: name,
        birthdate: birthdate,
        eyes: eyes,
        height: height,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/people",
        obj,
        "POST"
      );
      console.log(response.ok);
      console.log(respuestaJson);
      if (response.ok) {
        alert("Character successfully created");
      } else {
        alert("Failed to add character");
      }

      return response;
    },
    addPlanet: async (name, population, surface, diameter) => {
      const store = getStore();
      const actions = getActions();
      let obj = {
        name: name,
        population: population,
        surface: surface,
        diameter: diameter,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/planets",
        obj,
        "POST"
      );
      console.log(response.ok);
      console.log(respuestaJson);
      if (response.ok) {
        alert("Planet successfully created");
      } else {
        alert("Failed to add planet");
      }

      return response;
    },
    addVehicle: async (name, passengers, length, cargoCapacity) => {
      const store = getStore();
      const actions = getActions();
      let obj = {
        name: name,
        passengers: passengers,
        length: length,
        cargo_capacity: cargoCapacity,
      };

      let { respuestaJson, response } = await actions.useFetch(
        "/vehicles",
        obj,
        "POST"
      );
      console.log(response.ok);
      console.log(respuestaJson);
      if (response.ok) {
        alert("Vehicle successfully created");
      } else {
        alert("Failed to add vehicle");
      }

      return response;
    },
    initialFetchUsersData: async () => {
      try {
        let store = getStore();
        let responsePeople = fetch(
          "https://3001-metantonio-reactfinal-rvaoe9c7f3u.ws-us94.gitpod.io/api/people"
        );
        let responseVehicles = fetch(
          "https://3001-metantonio-reactfinal-rvaoe9c7f3u.ws-us94.gitpod.io/api/vehicles"
        );
        let responsePlanets = fetch(
          "https://3001-metantonio-reactfinal-rvaoe9c7f3u.ws-us94.gitpod.io/api/planets"
        );

        let [respuestaJsonPeople, respuestaJsonVehicles, respuestaJsonPlanets] =
          await Promise.all([
            responsePeople,
            responseVehicles,
            responsePlanets,
          ]).then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          );

        console.log(respuestaJsonPeople);
        console.log(respuestaJsonVehicles);
        console.log(respuestaJsonPlanets);

        setStore({
          ...store,
          usersData: [
            respuestaJsonPeople.people,
            respuestaJsonVehicles.vehicles,
            respuestaJsonPlanets.planets,
          ],
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
}
