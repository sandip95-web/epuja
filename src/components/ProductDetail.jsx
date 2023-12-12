import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import Loader from "./Loader";
import { FaStar, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import MetaData from "./MetaData";
import { toast, ToastContainer } from "react-toastify";
import { addItemToCart } from "../actions/cartActions";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { state, getProductDetail, singleProduct, isError, dispatch } =
    useGlobalContext();
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);
  const isInLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).some(
        (item) => item.product === id
      )
    : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isError) {
          return toast.error(isError);
        }
        await getProductDetail(dispatch, id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, getProductDetail, isError, alert, id]);

  const addToCart = () => {
    toast.success("Item Added to Cart");
    addItemToCart(dispatch, id, quantity, state);
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= singleProduct.product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  if (!singleProduct.product) {
    return <Loader />;
  }
  return (
    <>
      <MetaData title={singleProduct.product.name} />
      <ToastContainer position="top-center" />
      <div className="container my-5">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-6">
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide"
              data-bs-touch="false"
              data-bs-interval="false"
            >
              <div className="carousel-inner">
                {singleProduct.product.images &&
                  singleProduct.product.images.map((item, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={item.url}
                        className="d-block w-100"
                        alt={singleProduct.product.name}
                      />
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body text-start">
                <h2 className="card-title fs-1">
                  {singleProduct.product.name}
                </h2>
                <p className="card-subtitle mb-2 text-muted">
                  Category: {singleProduct.product.category}
                </p>

                {/* Rating */}
                <div className="d-flex mb-3">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="star"
                      color="#ffc107"
                      size={24}
                    />
                  ))}
                  <span className="ml-2">
                    {singleProduct.product.numOfReviews}
                  </span>
                </div>

                {/* Price */}
                <h3 className="card-text text-danger">
                  Price: Rs {singleProduct.product.price}
                </h3>
                <hr />

                {/* Quantity and Add to Cart in the Same Row with Space */}
                <div className="d-flex flex-sm-row flex-column align-items-start justify-content-sm-evenly mb-3">
                  <div className="mr-3">
                    <h5>Quantity:</h5>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary minus"
                        onClick={decreaseQty}
                      >
                        <FaMinus />
                      </button>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control d-inline count  text-center"
                          value={quantity}
                          readOnly
                        />
                      </div>
                      <button
                        className="btn btn-outline-secondary plus"
                        onClick={increaseQty}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div>
                    {user ? isInLocalStorage ? (
                      // If item is in the local storage, show "Remove from Cart" button
                      <button
                        className="btn btn-danger btn-lg my-2"
                        onClick={() => removeFromCart()}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      // If item is not in the local storage, show "Add to Cart" button
                      <button
                        className="btn btn-danger btn-lg my-2"
                        onClick={() => addToCart()}
                      >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </button>
                    ):null}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h5>
                    Status: <span className="text-success fs-6">in Stock</span>{" "}
                  </h5>
                </div>

                {/* Description */}
                <div className="mt-3">
                  <h5>Description:</h5>
                  <p>{singleProduct.product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
