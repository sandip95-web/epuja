import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { addItemToCart } from "../../actions/cartActions";
import MetaData from "../MetaData";
import { useGlobalContext } from "../../context/context";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const { dispatch, cartItems } = useGlobalContext();

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;
    addItemToCart(dispatch, id, newQty);
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;
    addItemToCart(dispatch, id, newQty);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row justify-content-between mx-2">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <div key={item.product}>
                  <hr />

                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                          className="img-fluid"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link
                          to={`/products/${item.product}`}
                          className="text-dark fw-bold"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price" className="fw-bold">
                          ${item.price}
                        </p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control count"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <button
                          className="btn btn-danger d-flex align-items-center"
                          onClick={() => removeCartItemHandler(item.product)}
                        >
                          <AiOutlineDelete />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4 className="fw-bold">Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values fw-bold">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values fw-bold">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
