import React from "react";
import { FaStar } from "react-icons/fa";
import MetaData from "./MetaData";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const Card = () => {
  const { isLoading, products } = useGlobalContext();
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div>
      <MetaData title={"EPuja - Buy Best Product"} />
      <div className="text-center">
        <h1 className="p-3 display-4 font-weight-bold text-Secondary">
          Explore Our Latest Products
        </h1>
        <p className="lead text-light">
          Discover a wide range of high-quality products to enhance your
          lifestyle.
        </p>
      </div>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {products &&
            products.map((item) => (
              <div className="col-md-4 mt-2" key={item._id}>
                <div className="card " style={{ minWidth: "250px" }}>
                  <div className="card-body">
                    <div className="card-img-actions">
                      <img
                        src={item.images[0].url}
                        className="card-img img-fluid"
                        width="96"
                        height="350"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="card-body bg-light text-center">
                    <div className="mb-2">
                      <h6
                        className="font-weight-semibold mb-2 text-truncate"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item.name}
                      >
                        <Link
                          to={`/product/${item._id}`}
                          className="text-default mb-2"
                          data-abc="true"
                        >
                          {item.name}
                        </Link>
                      </h6>

                      <p
                        className="text-muted mb-2 text-truncate"
                        data-abc="true"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item.category}
                      >
                        {item.category}
                      </p>
                    </div>

                    <h3 className="mb-0 font-weight-semibold">
                      Rs. {item.price}
                    </h3>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`star ${
                            item.rating >= index + 1
                              ? "text-success"
                              : item.rating >= index + 0.5
                              ? "text-warning"
                              : "text-danger"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-muted mb-3">
                      {item.numOfReviews} Reviews
                    </div>

                    <Link to={`/product/${item._id}`} className="btn bg-cart">
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
