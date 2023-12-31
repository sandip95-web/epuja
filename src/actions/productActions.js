import axios from "axios";

export const getProduct = async (dispatch,currentPage=1,keyword="",category="") => {
 
  try {
    dispatch({type:"ALL_PRODUCT_REQUEST"});
    const { data } = await axios.get(`/product?keyword=${encodeURIComponent(keyword)}&page=${currentPage}&category=${encodeURIComponent(category)}`);
    dispatch({
      type: "ALL_PRODUCT_SUCCESS",
      payload: data,
    });
return data;
  } catch (error) {
    dispatch({
      type: "ALL_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getProductDetail = async (dispatch,id) => {
 
  try {
    dispatch({type:"PRODUCT_DETAIL_REQUEST"});
    const { data } = await axios.get(`/product/${id}`);
   
    dispatch({
      type: "PRODUCT_DETAIL_SUCCESS",
      payload: data,
      
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "PRODUCT_DETAIL_FAIL",
      payload: error.message,
    });
  }
};

export const clearErrors = async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
    payload:'',
  });
};
