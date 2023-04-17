import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let { respuestaJson, response } = await actions.login(email, password);
    if (response.ok) {
      actions.initialFetchUsersData();
      actions.getUserFavorites();
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form className="d-flex" onSubmit={handleLogin}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control me-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
