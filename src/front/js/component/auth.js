export const register = async (name, username, email, password) => {
  const response = await fetch(process.env.BACKEND_URL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export default register;
