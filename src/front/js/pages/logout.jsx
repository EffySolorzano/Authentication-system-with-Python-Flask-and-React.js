import React from "react";
import { userActions } from "../store/exampleStore";

const Logout = () => {
  const { logout } = userActions();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className="nav-link">
      Logout
    </button>
  );
};

export default Logout;
