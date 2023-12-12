// ProtectedRoute.js
import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/context';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const storedUser=localStorage.getItem("user");
  const user=JSON.parse(storedUser);
  const isAuthenticated=localStorage.getItem('CheckAuthentication');
  
  const navigate = useNavigate();
  useEffect(() => {
    
    if (!isAuthenticated) {
      toast.warning('Please Login');
      navigate('/login');
    }
    else if(isAuthenticated && user && user.role!=="admin"){
      toast.warning("Your are not authorized");
      navigate("/");
    }
  },[isAuthenticated, user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
