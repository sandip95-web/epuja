import { useReducer } from "react";
import { createContext } from "react";
import { productReducer } from "./Reducer";
import { useContext } from "react";
import { getProduct, getProductDetail,} from "../actions/productActions";
import {login,getUserDetail,logout,forgotPassword,resetPassword} from '../actions/userActions';
const AppContext = createContext();
const initalState = {
  isLoading: false,
  isError: false,
  products: [],
  singleProduct: [],
  productsCount:0,
  itemsPerPage:0,
  searchItems:[],
  isAuthenticated:false,
  user:{},
  isSuccess:false,
  message:"",
  success:false
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initalState);

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, getProduct, getProductDetail,login,getUserDetail,logout,forgotPassword,resetPassword}}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
