import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swl from "../../img/swl.jpg";
import Galaxy from "../../img/galaxy.jpg";
import { Context } from "../store/appContext";
import Logout from "../pages/logout.jsx";
import Login from "../pages/login.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleDelete = async (favorite) => {
    try {
      await actions.deleteFavorite(favorite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const result = await actions.logout();
    if (result) {
      setIsLoggedIn(false);
      setCurrentUser({});
    }
  };

  let navbarItems;

  if (store.isLoggedIn) {
    navbarItems = (
      <>
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
                    <React.Fragment key={index}>
                      <Link to={item.link} className="text-left">
                        <li className="d-flex align-items-center">
                          {item.name}
                        </li>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <>No favorites yet</>
            )}
          </ul>
        </div>
        <button className="btn btn-warning" onClick={handleLogout}>
          Logout
        </button>
      </>
    );
  } else {
    navbarItems = (
      <div className="right-side">
        <Link to="/login">
          <button className="btn btn-warning login">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-warning register">Register</button>
        </Link>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-dark">
      <div className="navbar-container-fluid">
        <Link to="/">
          <img className="logo" src={Swl} alt="star wars logo" />
        </Link>
        <img className="galaxy" src={Galaxy} alt="star wars galaxy" />
      </div>
      {navbarItems}
    </nav>
  );
};
