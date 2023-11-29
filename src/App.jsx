import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/App.css";
import axios from "axios";
import ProductDetail from "./components/ProductDetail";
import Search from "./components/Search";
import { ToastContainer } from "react-toastify";
import Login from "./components/user/Login";
import ForgotPassword from "./components/user/ForgotPassword";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword?/:category?" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
