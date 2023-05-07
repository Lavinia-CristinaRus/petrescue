import axios from "axios";

const serverUrl = "http://127.0.0.1:8000/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${serverUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        `${serverUrl}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${serverUrl}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "verificationSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.put(
      `${serverUrl}/resetpassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllReports = (dispatch) => async (dispatch) => {
  try {
    dispatch({ type: "allReportsRequest" });

    const { data } = await axios.get(`${serverUrl}/getallreports`);
    dispatch({ type: "allReportsSuccess", payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: "allReportsFailure", payload: error.response.data.message });
  }
};

export const seenPet = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "seenPetRequest" });

    const { data } = await axios.put(`${serverUrl}/seen/${userId}`);
    dispatch({ type: "seenPetSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "seenPetFailure",
      payload: error.response.data.message,
    });
  }
};

export const uneenPet = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "unseenPetRequest" });

    const { data } = await axios.put(`${serverUrl}/unseen/${userId}`);
    dispatch({ type: "unseenPetSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "unseenPetFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllPets = (dispatch) => async (dispatch) => {
  try {
    dispatch({ type: "allPetsRequest" });

    const { data } = await axios.get(`${serverUrl}/getallpets`);
    dispatch({ type: "allPetsSuccess", payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: "allPetsFailure", payload: error.response.data.message });
  }
};

export const savePet = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "savePetRequest" });

    const { data } = await axios.put(`${serverUrl}/savepet/${userId}`);
    dispatch({ type: "savePetSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "savePetFailure",
      payload: error.response.data.message,
    });
  }
};

export const unsavePet = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "unsavePetRequest" });

    const { data } = await axios.put(`${serverUrl}/unsavepet/${userId}`);
    dispatch({ type: "unsavePetSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "unsavePetFailure",
      payload: error.response.data.message,
    });
  }
};

