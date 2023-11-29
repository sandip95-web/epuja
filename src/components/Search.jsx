import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {toast} from 'react-toastify';
import axios from "axios"; // Make sure to import axios

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      if (keyword.trim()) {
        let response;

        // Customize the search logic based on your requirements
        // For example, you might make an API request to search for items
        response = await axios.get(`/product?keyword=${keyword}`);

        // Check if items were found
        if (response.data.product.length > 0) {
          navigate(`/search/${keyword}`);
        } else {
          // If no items found, show a toast message and navigate to the home screen
          toast.error("No items found with the provided keyword");
          navigate("/");
        }
      } else {
        // If the search input is empty, show a toast message and navigate to the home screen
        toast.error("Please enter a search keyword");
        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }

      setKeyword("");
    } catch (error) {
      console.error("Error searching for items:", error);

     
      toast.error(error.response.data.message);
      navigate("/");
      setKeyword("");
    }
  };
  return (
    <>
      <Form onSubmit={handleSearch} className="d-flex">
        <Form.Group controlId="formSearch" className="flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-100" // Set width to 100% for smaller screens
          />
        </Form.Group>
        &nbsp;
        <Button variant="primary" type="submit">
          <FiSearch /> Search
        </Button>
      </Form>
    </>
  );
};

export default Search;
