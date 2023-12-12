import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 sidebar">
          <Sidebar/>
          {/* Sidebar content goes here */}
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10">
          <h1 className="my-4">Dashboard</h1>

          {/* Metadata */}
          {/* MetaData component goes here */}

          <div className="row">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount<br /> <b>${/* totalAmount value */}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Products Card */}
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products<br /> <b>{/* products.length value */}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            {/* Orders Card */}
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders<br /> <b>{/* orders.length value */}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            {/* Users Card */}
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users<br /> <b>{/* users.length value */}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/users"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            {/* Out of Stock Card */}
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock<br /> <b>{/* outOfStock value */}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
