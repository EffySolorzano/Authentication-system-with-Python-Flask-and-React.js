import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import C3PO from "../../img/C3PO.png";

const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in both fields",
      });
      return;
    }
    let response = await actions.login(email, password);
    if (response.ok) {
      //actions.initialFetchUsersData();
      //actions.getUserFavorites();
      Swal.fire({
        icon: "success",
        title: "Login successful!",
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="login-form">
          <h1 className="fs-1 fw-bold mt-5">
            <img src={C3PO} alt="c3pO-img" className="C3PO" />
          </h1>
          <form className="d-flex flex-column" onSubmit={handleLogin}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="button-login">
        <button
          className="btn btn-outline-warning"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
