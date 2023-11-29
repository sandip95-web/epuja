import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      if (keyword.trim() || selectedCategory.trim()) {
        let response;
        let searchQuery = `/product?`;

        // Include keyword in the search query if provided
        if (keyword.trim()) {
          searchQuery += `keyword=${keyword}`;
        }

        // Include category in the search query if provided
        if (selectedCategory.trim()) {
          if (keyword.trim()) {
            searchQuery += `&`;
          }
          searchQuery += `category=${selectedCategory}`;
        }
   console.log(searchQuery);
        response = await axios.get(searchQuery);

        if (response.data.product.length > 0) {
          // Include keyword and category in the URL only if both provided
          const searchUrl = `/search/${keyword.trim() ? `${keyword}/` : ""}${
            selectedCategory.trim() ? `category=${selectedCategory}` : ""
          }`;

          navigate(searchUrl);
        } else {
          toast.error("No items found with the provided criteria");
          navigate("/");
        }
      } else {
        toast.error("Please enter a search keyword or select a category");
        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }

      setKeyword("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error searching for items:", error);
      toast.error(error.response?.data?.message || "An error occurred");
      navigate("/");
      setKeyword("");
      setSelectedCategory("");
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch} className="d-flex flex-wrap">
        {/* Category Dropdown */}
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="primary" id="categoryDropdown">
            {selectedCategory ? selectedCategory : "Category"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[
              "Idols and Statues",
              "Puja Accessories",
              "Incense and Dhoop",
              "Puja Books and Scriptures",
              "Devotional Music and Instruments",
              "Rudraksha Beads and Malas",
              "Clothing and Attire",
              "Festival and Seasonal Decor",
              "Prasad and Offerings",
              "Astrology and Vastu Products",
              "Puja Thalis and Accessories",
              "Devotional Books",
            ].map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Search Input */}
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






// import React, { useState } from "react";
// import { FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { useGlobalContext } from "../context/context";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Search = () => {
//   const navigate = useNavigate();
//   const [keyword, setKeyword] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     try {
//       if (keyword.trim() || selectedCategory.trim()) {
//         let response;
//         let searchQuery = `/product?`;

//         // Include keyword in the search query if provided
//         if (keyword.trim()) {
//           searchQuery += `keyword=${keyword}`;
//         }

//         // Include category in the search query if provided
//         if (selectedCategory.trim()) {
//           if (keyword.trim()) {
//             searchQuery += `&`;
//           }
//           searchQuery += `category=${selectedCategory}`;
//         }

//         response = await axios.get(searchQuery);

//         if (response.data.product.length > 0) {
//           // Include keyword and category in the URL only if both provided
//           const searchUrl = `/search/${keyword.trim() ? `${keyword}/` : ""}${
//             selectedCategory.trim() ? `category=${selectedCategory}` : ""
//           }`;

//           navigate(searchUrl);
//         } else {
//           toast.error("No items found with the provided criteria");
//           navigate("/");
//         }
//       } else {
//         toast.error("Please enter a search keyword or select a category");
//         if (window.location.pathname !== "/") {
//           navigate("/");
//         }
//       }

//       setKeyword("");
//       setSelectedCategory("");
//     } catch (error) {
//       console.error("Error searching for items:", error);
//       toast.error(error.response?.data?.message || "An error occurred");
//       navigate("/");
//       setKeyword("");
//       setSelectedCategory("");
//     }
//   };

//   return (
//     <>
//       <Form onSubmit={handleSearch} className="d-flex flex-wrap">
//         <Form.Group controlId="formSearch" className="flex-grow-1">
//           <Form.Control
//             type="text"
//             placeholder="Search for products..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-100" // Set width to 100% for smaller screens
//           />
//         </Form.Group>
//         &nbsp;
//         <Button variant="primary" type="submit">
//           <FiSearch /> Search
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default Search;
