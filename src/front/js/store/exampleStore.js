export const userStore = {
  userList: [],
  user: {
    msg: "I'm an object",
  },
  currentUser: "",
  isLoggedIn: false,
  usersData: [],
  favoritos: [],
};

export const userActions = (getStore, getActions, setStore) => {
  const useLocalFetch = async (endpoint, body = "", method = "GET") => {
    try {
      const url = "http://127.0.0.1:3001/api" + endpoint;
      const requestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: body ? JSON.stringify(body) : null,
      };
      const response = await fetch(url, requestInit);
      const respuestaJson = await response.json();
      return { respuestaJson, response };
    } catch (error) {
      console.log("Error loading data from local API", error);
    }
  };

  return {
    login: async (email, password) => {
      try {
        const store = getStore();
        const response = await fetch("http://127.0.0.1:3001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();

        console.log("Response Data:", data);

        if (response.ok) {
          const token = data.access_token; // Assign the token value from the response data
          localStorage.setItem("token", token);
          console.log("Token stored in localStorage:", token);
          setStore({
            ...getStore(),
            isLoggedIn: true,
            id: data.id,
          });
          localStorage.setItem("isLoggedIn", "true");
        } else {
          console.log("Login failed");
          localStorage.removeItem("token");
          setStore({ ...getStore(), isLoggedIn: false, id: null });
          localStorage.removeItem("isLoggedIn");
        }

        return response;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },

    logout: async () => {
      let body = "";
      let { respuestaJson, response } = await useLocalFetch(
        "/logout",
        body,
        "POST"
      );
      if (response && response.ok) {
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...getStore(), isLoggedIn: false });
      } else {
        console.log("Error logging out", respuestaJson.message);
      }
    },

    getUser: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const response = await fetch(
          "http://127.0.0.1:3001/api" + "/get-user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        const user = data.user;
        setStore({ user, error: null });
        return user;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },
    register: async (fullname, username, email, password, isActive) => {
      try {
        console.log(fullname, username, email, password, isActive);
        const response = await fetch(
          "http://127.0.0.1:3001/api" + "/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullname: fullname,
              username: username,
              email: email,
              password: password,
              is_active: isActive,
            }),
          }
        );
        const data = await response.json();
        const user = data.user;
        localStorage.setItem("token", data.token);
        setStore({ user, error: null });
        return { ok: true, user };
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: "Something went wrong" });
        return { ok: false, message };
      }
    },
    // Fetch favorites from API
    getFavorites: async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/api/" + "/favorites",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setStore({ favoritos: data });
      } catch (error) {
        console.error(error);
      }
    },

    agregarFavorito: async (favorito) => {
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:3001/api//favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          people_name: favorito.people_name || null,
          planet_name: favorito.planet_name || null,
          starship_name: favorito.starship_name || null,
        }),
      });
      const store = getStore();
      const newFavoritos = [...store.favoritos, favorito];
      setStore({ ...getStore(), favoritos: newFavoritos });
    },

    deleteFavorite: async (favorite) => {
      const store = getStore();
      const updatedFavorites = store.favoritos.filter(
        (item) => item.name !== favorite.name
      );
      setStore({ ...getStore(), favoritos: updatedFavorites });
    },
    addPeople: async (props) => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: props.name,
            height: props.height,
            mass: props.mass,
            hair_color: props.hair_color,
          }),
        });

        if (response.status === 201) {
          console.log("Character added successfully");
          // Handle the updated store or state if necessary
        } else {
          console.log("Error adding character");
          // Handle the error if needed
        }
      } catch (error) {
        console.log("Error adding character:", error);
        // Handle the error if needed
      }
    },
    addPlanet: async (props) => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/add-planet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: props.name,
            diameter: props.diameter,
            rotation_period: props.rotation_period,
            orbital_period: props.orbital_period,
            gravity: props.gravity,
          }),
        });

        if (response.status === 201) {
          console.log("Planet added successfully");
          // Handle the updated store or state if necessary
        } else {
          console.log("Error adding planet");
          // Handle the error if needed
        }
      } catch (error) {
        console.log("Error adding planet:", error);
        // Handle the error if needed
      }
    },
    addStarship: async (props) => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/add-starship", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: props.model,
            starship_class: props.starship_class,
            manufacturer: props.manufacturer,
            cost_in_credits: props.cost_in_credits,
            length: props.length,
          }),
        });

        if (response.status === 201) {
          console.log("Starship added successfully");
          // Handle the updated store or state if necessary
        } else {
          console.log("Error adding starship");
          // Handle the error if needed
        }
      } catch (error) {
        console.log("Error adding starship:", error);
        // Handle the error if needed
      }
    },
  };
};
