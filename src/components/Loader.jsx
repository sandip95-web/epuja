import React from "react";

const Loader = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <button className="btn btn-none" type="button">
          <span
            className="spinner-border spinner-border-lg"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
            aria-hidden="true"
          ></span>
          <h2 className="text-light">Loading...</h2>
        </button>
      </div>
    </>
  );
};

export default Loader;
