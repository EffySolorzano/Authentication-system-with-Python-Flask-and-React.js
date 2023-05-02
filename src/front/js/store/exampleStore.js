export const userStore = {
  userList: [],
  user: {
    msg: "I'm an object",
  },
  currentUser: "",
  loggedIn: false,
  usersData: [],
  favoritos: [],
};

export const userActions = (getStore, getActions, setStore) => {
  const useLocalFetch = async (endpoint, body = "", method = "GET") => {
    try {
      const url = "http://127.0.0.1:3001/api" + endpoint;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: body ? JSON.stringify(body) : null,
      });
      const respuestaJson = await response.json();
      return { respuestaJson, response };
    } catch (error) {
      console.log("Error loading data from local API", error);
    }
  };
  return {
    login: async (email, password) => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api" + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        const user = data.user;
        localStorage.setItem("token", data.token);
        setStore({ ...getStore(), isLoggedIn: true });
        return response;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },

    logout: async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          credentials: "include",
        });
        const data = await response.json();
        const user = data.user;
        localStorage.removeItem("token");
        setStore({ ...getStore(), isLoggedIn: false });
        return response;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },
    getUser: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const response = await fetch("http://127.0.0.1:3001/api" + "/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    agregarFavorito: (favorito) => {
      const store = getStore();
      const newFavoritos = [...store.favoritos, favorito];
      setStore({ ...store, favoritos: newFavoritos });
    },
    deleteFavorite: async (favorite) => {
      const store = getStore();
      const updatedFavorites = store.favoritos.filter(
        (item) => item.name !== favorite.name
      );
      setStore({ ...store, favoritos: updatedFavorites });
    },
  };
};
