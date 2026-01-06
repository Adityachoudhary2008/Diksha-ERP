import axios from "axios";
import API_URL from "../../api";
import {
  authRequest,
  authSuccess,
  authFail,
  logoutSuccess,
} from "./userSlice";

// ===================== ADMIN =====================

// Admin Register
export const adminRegister = (data) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(`${API_URL}/AdminReg`, data);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authFail(
        error.response?.data?.message || "Admin registration failed"
      )
    );
  }
};

// Admin Login
export const adminLogin = (data) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(`${API_URL}/AdminLogin`, data);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authFail(
        error.response?.data?.message || "Admin login failed"
      )
    );
  }
};

// ===================== STUDENT =====================

// Student Register
export const studentRegister = (data) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(`${API_URL}/StudentReg`, data);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authFail(
        error.response?.data?.message || "Student registration failed"
      )
    );
  }
};

// Student Login
export const studentLogin = (data) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(`${API_URL}/StudentLogin`, data);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authFail(
        error.response?.data?.message || "Student login failed"
      )
    );
  }
};

// ===================== TEACHER =====================

// Teacher Register
export const teacherRegister = (data) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(`${API_URL}/TeacherReg`, data);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authFail(
        error.response?.data?.message || "Teacher registration failed"
      )
    );
  }
};

// Teacher Login
export const teacherLogin = (data) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(`${API_URL}/TeacherLogin`, data);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authFail(
        error.response?.data?.message || "Teacher login failed"
      )
    );
  }
};

// ===================== LOGOUT =====================

export const logoutUser = () => (dispatch) => {
  dispatch(logoutSuccess());
};
