import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { login } from "../../actions/userActions";
import { toast } from "react-toastify";
import Loader from "../Loader";
import MetaData from "../MetaData";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, isAuthenticated, isError, isLoading, isSuccess } = useGlobalContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("CheckAuthentication", isAuthenticated);
      localStorage.setItem("success", isSuccess);
      navigate("/");
      toast.success("Login Successfully");
    } else {
      navigate("/login");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isAuthenticated, isError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(dispatch, formData.email, formData.password);
    } catch (error) {
      console.log("Login failed: ", error.message);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <MetaData title={"Login"} />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-white bg-dark ">
            <div className="card-header text-center">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <Link
                  to="/forgotpassword"
                  className="mt-2 d-block text-center text-danger"
                >
                  Forgot Password?
                </Link>

                {/* Add the link to register here */}
                <Link
                  to="/register"
                  className="mt-2 d-block text-center text-success"
                >
                  Need an account? Register here
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
