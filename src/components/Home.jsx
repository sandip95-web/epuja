import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useGlobalContext } from "../context/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
import { useParams } from "react-router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Search from "./Search";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { getProduct, isError, dispatch, productsCount, itemsPerPage,getUserDetail } =
    useGlobalContext();
  const { keyword } = useParams();


  function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; ");
  
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
  
    return null;
  }


  useEffect(() => {
    const token = getCookieValue("token");
    let id = localStorage.getItem("id");
    if(!token){
      id=""
    }
    if (token && id) {
    getUserDetail(dispatch,id,token);
    }
    const fetchData = async () => {
      try {
        if (isError) {
          toast.error(isError);
          return;
        }
        await getProduct(dispatch, currentPage, keyword);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, getProduct, isError, currentPage, keyword]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={12} className="mb-3">
          <Search />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card />
        </Col>
      </Row>

      {itemsPerPage <= productsCount && (
        <Row className="mt-5">
          <Col md={12}>
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                lastPageText="Last"
                prevPageText="Prev"
                firstPageText="First"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
