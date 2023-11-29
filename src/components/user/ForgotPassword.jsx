import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isError, isLoading, message, dispatch,forgotPassword} = useGlobalContext();

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({
        type: "CLEAR_ERROR",
      });
    }
    if(message){
        toast.success(message);
    }
  }, [isError,message]);

  const handleSubmit =(e)=>{
     e.preventDefault();
     const formData=new FormData();
     formData.set('email',email);
     forgotPassword(dispatch,formData);
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-white bg-dark ">
              <div className="card-header text-center">
                <h2>Forgot Password</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Email
                  </button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
