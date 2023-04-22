import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swl from "../../img/swl.jpg";
import Galaxy from "../../img/galaxy.jpg";
import { Context } from "../store/appContext";
import Login from "../pages/login.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const handleDelete = (itemIndex) => {
    actions.deleteFavorite(itemIndex);
  };

  return (
    <nav className="navbar navbar-dark">
      <div className="container-fluid">
        <Link to="/">
          <img className="logo" src={Swl} alt="star wars logo" />
        </Link>
        <img className="galaxy" src={Galaxy} alt="star wars galaxy" />
      </div>
      <div>
        <div className="nav-item dropdown btn btn-warning">
          <div
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites
          </div>
          <ul
            className="dropdown-menu list-unstyled"
            aria-labelledby="navbarDropdown"
          >
            {store.favoritos && store.favoritos.length > 0 ? (
              <>
                {store.favoritos.map((item, index) => {
                  return (
                    <>
                      <React.Fragment key={index}>
                        <Link to={item.link} className="text-left">
                          <li className="d-flex align-items-center">
                            {item.name}
                          </li>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(index)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </React.Fragment>
                    </>
                  );
                })}
              </>
            ) : (
              <>No favorites yet</>
            )}
          </ul>
        </div>
        <Link to="/login">
          <button className="btn btn-warning login">Login</button>
        </Link>
      </div>
      <div>
        <Link to="/register">
          <button className="btn btn-warning register">Register</button>
        </Link>
      </div>
    </nav>
  );
};
