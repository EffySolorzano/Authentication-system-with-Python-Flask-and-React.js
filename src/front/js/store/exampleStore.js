export const userStore = {
  user: null,
  error: null,
};

export const userActions = (getStore, getActions, setStore) => ({
  login: async (email, password) => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
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
      const response = await fetch(process.env.BACKEND_URL + "/user", {
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
      const response = await fetch(process.env.BACKEND_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, password, isActive }),
      });
      const data = await response.json();
      const user = data.user;
      localStorage.setItem("token", data.token);
      setStore({ user, error: null });
      return { ok: true, user };
    } catch (error) {
      const message = error.message || "Something went wrong";
      setStore({ user: null, error: message });
      return { ok: false, message };
    }
  },
});
