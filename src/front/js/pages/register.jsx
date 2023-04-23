import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Deathstar from "../../img/deathstar.png";

const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);
  }, [email]);

  useEffect(() => {
    console.log(password);
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields",
      });
      return;
    }
    const response = await actions.register(
      name,
      username,
      email,
      password,
      isActive
    );
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
      }).then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed. Please try again later.",
      });
    }
  };

  console.log(actions);

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="register-form">
            <h1 className="fs-1 fw-bold mt-5">
              <img src={Deathstar} alt="deathstar-img" className="death" />
            </h1>
          </div>
          <div className="form">
            <form>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter full name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="register-button-container">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
