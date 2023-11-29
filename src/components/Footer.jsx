import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaSnapchatGhost,
  FaTiktok,
  FaPhone,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 my-2">
      <div className="container">
     
        <div className="row mb-4">
          {/* Information Column */}
          <div className="col-md-4">
            <h5 className="mb-3">Information</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Search
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex flex-column">
              <div className="mb-3 d-flex align-items-center">
                <a href="#" title="Instagram" className="text-light">
                  <FaInstagram size={30} className="mr-2" />&nbsp;
                  Instagram
                </a>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <a href="#" title="Twitter" className="text-light">
                  <FaTwitter size={30} className="mr-2" />&nbsp;
                  Twitter
                </a>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <a href="#" title="Facebook" className="text-light">
                  <FaFacebook size={30} className="mr-2" />&nbsp;
                  Facebook
                </a>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <a href="#" title="Snapchat" className="text-light">
                  <FaSnapchatGhost size={30} className="mr-2" />&nbsp;
                  Snapchat
                </a>
              </div>
              <div className="d-flex align-items-center mb-3">
                <a href="#" title="TikTok" className="text-light">
                  <FaTiktok size={30} className="mr-2" />&nbsp;
                  TikTok
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Customer Services</h5>
            <div className="d-flex flex-column">
              <div className="mb-3 d-flex align-items-center">
                <a href="#" title="Instagram" className="text-light">
                  <FaPhone size={30} className="mr-2" />&nbsp;
                  Contact Us: 9832425234
                </a>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <a href="#" title="Twitter" className="text-light">
                  <MdOutlineMailOutline size={30} className="mr-2" />&nbsp;
                  Email us: abc@gmail.com
                </a>
              </div>
              
              
              
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2023 Epuja. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
