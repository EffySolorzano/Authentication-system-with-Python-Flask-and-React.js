export const userStore = {
  user: null,
  error: null,
};

export const userActions = (getStore, getActions, setStore) => ({
  login: async (email, password) => {
    try {
      const response = await fetch(
        "https://3001-effysolorza-authenticat-str1q4tjvum.ws-us95.gitpod.io/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      const user = data.user;
      localStorage.setItem("token", data.token);
      setStore({ user, error: null });
      return user;
    } catch (error) {
      const message = error.message || "Something went wrong";
      setStore({ user: null, error: message });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    setStore({ user: null, error: null });
  },
  getUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const response = await fetch(
        "https://3001-effysolorza-authenticat-str1q4tjvum.ws-us95.gitpod.io/api/user",
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

  register: async (fullName, userName, email, password) => {
    const actions = getActions();
    console.log(
      "Es la encargada de registrar al usuario",
      fullName,
      userName,
      email,
      password
    );
    let obj = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
    };

    let { respuestaJson, response } = await actions.useFetch(
      "https://3001-effysolorza-authenticat-str1q4tjvum.ws-us95.gitpod.io/register",
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
});
