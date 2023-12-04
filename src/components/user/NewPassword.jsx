import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useGlobalContext } from '../../context/context';
import { toast } from 'react-toastify';

const NewPassword = () => {

   const{isError,success,dispatch,resetPassword}=useGlobalContext();
   const[password,setPassoword]=useState('')
   const[confirmPassword,setConfirmPassword]=useState('');
   const {token}=useParams();
   const navigate =useNavigate();


useEffect(()=>{
  if(isError){
    toast.error(isError);
  }
  if(success){
    toast.success('Password successfully updated');
    navigate('/login');
  }
},[success,isError])

   const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    resetPassword(dispatch,token,formData);
}
  return (
    <div className="container mt-5 mb-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card text-white bg-dark ">
          <div className="card-header text-center">
            <h2>New Password</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassoword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="Password"
                  className="form-control"
                  id="confirmpassword"
                  name="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NewPassword