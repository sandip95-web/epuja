export const productReducer = (state, action) => {
  switch (action.type) {
    case "ALL_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
        products: [],
      };
    case "ALL_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        products: action.payload.product,
        searchItems: action.payload.product ? action.payload.product : [],
        productsCount: action.payload.count,
        itemsPerPage: action.payload.itemsPerPage,
      };
    case "ALL_PRODUCT_FAIL":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        isError: null,
      };
    case "PRODUCT_DETAIL_REQUEST":
      return {
        ...state,
        isLoading: true,
        singleProduct: [],
      };
    case "PRODUCT_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        singleProduct: action.payload,
      };
    case "PRODUCT_DETAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        isError: action.payload,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        isSuccess: true,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isError: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    case "LOGOUT_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isError: action.payload,
      };
    case "FORGOT_PASSWORD_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    case " FORGOT_PASSWORD_FAIL":
      return {
        ...state,
        loading: false,
        isError: action.payload,
      };

    default:
      return state;
  }
};
