import axios from "axios";

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
    const token = data.token;
    const userId = data.userFind._id;
    localStorage.setItem("token", token);
    localStorage.setItem("id", userId);
    console.log(data);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.user,
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
      console.log("id:", id);
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

