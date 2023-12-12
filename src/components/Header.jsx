import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Header = () => {
  const [active, setActive] = useState("home");
  const { dispatch, logout, isLoading } = useGlobalContext();
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const isSuccess = localStorage.getItem("success");
  const handleLogout = () => {
    try {
      logout(dispatch);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <img
              src={logo}
              alt=""
              width="100"
              height="100"
              className="d-inline-block align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={active === "home" ? "nav-link active" : "nav-link"}
                  onClick={() => setActive("home")}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    active === "about" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setActive("about")}
                  href="#"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={active === "blog" ? "nav-link active" : "nav-link"}
                  onClick={() => setActive("blog")}
                  href="#"
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    active === "contact" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setActive("contact")}
                  href="#"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="d-flex flex-sm-row flex-column align-items-sm-center justify-content-start">
              {user && isSuccess ? (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar.url}
                      width={30}
                      height={30}
                      alt=""
                      className="rounded-circle"
                    />
                    &nbsp;<span>{user.name}</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {user && user.role === "admin" && (
                      <li>
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <Link className="dropdown-item" to="/orders/me">
                      Orders
                    </Link>
                    <Link className="dropdown-item" to="/me">
                      Profile
                    </Link>
                    <Link
                      className="dropdown-item text-danger"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </ul>
                </div>
              ) : (
                !isLoading && (
                  <Link to="/login" className="btn text-white bg-primary">
                    Login
                  </Link>
                )
              )}
              {user && (
                <Link
                  to="/cart"
                  className="btn bg-none text-white btn-outline-none shadow-none"
                >
                  <h6>
                    <AiOutlineShoppingCart className="fs-3" />
                    <span className="badge bg-secondary">New</span>
                  </h6>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
