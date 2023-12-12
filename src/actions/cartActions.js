import axios from "axios";

export const addItemToCart = async (dispatch, id, quantity) => {
  try {
    const { data } = await axios.get(`/product/${id}`);

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity
      }
    });

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = [
      ...existingCartItems,
      {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity
      }
    ];

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};
