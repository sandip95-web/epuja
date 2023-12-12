import axios from "axios";



export const register = async (dispatch,userData) => {
  try {

      dispatch({ type: 'REGISTER_USER_REQUEST' })

      const config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      const { data } = await axios.post('/user/register', userData, config)
      console.log(data);
      dispatch({
          type: 'REGISTER_USER_SUCCESS',
          payload: data.user
      })

  } catch (error) {
      dispatch({
          type: 'REGISTER_USER_FAIL',
          payload: error.response.data.message
      })
  }
}


export const login = async (dispatch, email, password) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/user/login",
      { email, password },
      config
    );
    const user=data.userFind;
    const userId = data.userFind._id;
    localStorage.setItem("id", userId);
    localStorage.setItem("user", JSON.stringify(user));
    
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.userFind,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getUserDetail = async (dispatch, id, token) => {
  try {
    if (token) {
      dispatch({ type: "LOGIN_REQUEST" });
      const { data } = await axios.get("/user/info", {
        params: {
          id: id,
        },
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const logout = async (dispatch) => {
  try {
    await axios.post("/user/logout");
    localStorage.clear();
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = async (dispatch,formData) => {
  try {
    const email = formData.get('email');
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST' })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const { data } = await axios.post('/password/forget',{email}, config)

    dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: data.message
    })

} catch (error) {
    dispatch({
        type: 'FORGOT_PASSWORD_FAIL',
        payload: error
    })
}
};

export const resetPassword=async (dispatch,token,passwords) => {
  try {

      dispatch({ type: 'NEW_PASSWORD_REQUEST' })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/password/reset/${token}`, passwords, config)
      console.log("data: ",data);
      dispatch({
          type: 'NEW_PASSWORD_SUCCESS',
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: 'NEW_PASSWORD_FAIL',
          payload: error.response.data.message
      })
  }
}

