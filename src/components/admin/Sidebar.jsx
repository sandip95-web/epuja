import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaProductHunt, FaClipboard, FaPlus, FaShoppingBasket, FaUsers, FaStar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper mt-4 mb-4"> {/* Add margin-top and margin-bottom */}
      <nav id="sidebar">
        <ul className="nav flex-column">
          <li className="nav-item dropdown">
            <button
              className="btn btn-link dropdown-toggle font-weight-bold text-dark"
              type="button"
              id="productDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ textDecoration: 'none', border: 'none' }} // Remove underline and border
            >
              <FaProductHunt /> Products
            </button>
            <div className="dropdown-menu" aria-labelledby="productDropdown">
              <Link to="/admin/products" className="dropdown-item text-dark">
                <FaClipboard /> All
              </Link>
              <Link to="/admin/newproduct" className="dropdown-item text-dark">
                <FaPlus /> Create
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/admin/orders" className="nav-link font-weight-bold text-dark">
              <FaShoppingBasket /> Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/users" className="nav-link font-weight-bold text-dark">
              <FaUsers /> Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/reviews" className="nav-link font-weight-bold text-dark">
              <FaStar /> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
