import axios from "axios";
import API_URL from "../../api";

import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getRequest,
  getFailed,
  getError,
} from "./userSlice";

/**
 * 🔥 VERY IMPORTANT
 * Backend routes are case-sensitive:
 * AdminReg, StudentReg, TeacherReg
 */
const normalizeRole = (role) => {
  if (!role) return "";
  return role.charAt(0).toUpperCase() + role.slice(1);
};

// ================= LOGIN =================
export const loginUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const fixedRole = normalizeRole(role);
    const res = await axios.post(
      `${API_URL}/${fixedRole}Login`,
      fields,
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(
      authError(
        error.response?.data?.message || "Login failed"
      )
    );
  }
};

// ================= REGISTER =================
export const registerUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const fixedRole = normalizeRole(role);
    const res = await axios.post(
      `${API_URL}/${fixedRole}Reg`,
      fields,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.data.schoolName || res.data.role) {
      dispatch(authSuccess(res.data));
    } else if (res.data.school) {
      dispatch(stuffAdded(res.data));
    } else {
      dispatch(authFailed(res.data.message));
    }
  } catch (error) {
    dispatch(
      authError(
        error.response?.data?.message || "Registration failed"
      )
    );
  }
};

// ================= LOGOUT =================
export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

// ================= GET USER DETAILS =================
export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const res = await axios.get(`${API_URL}/${address}/${id}`);
    dispatch(doneSuccess(res.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

// ================= DELETE (DISABLED) =================
export const deleteUser = () => async (dispatch) => {
  dispatch(getFailed("Delete is disabled"));
};

// ================= UPDATE =================
export const updateUser = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const res = await axios.put(
      `${API_URL}/${address}/${id}`,
      fields,
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch(doneSuccess(res.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

// ================= ADD OTHER STUFF =================
export const addStuff = (fields, address) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await axios.post(
      `${API_URL}/${address}Create`,
      fields,
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch(stuffAdded(res.data));
  } catch (error) {
    dispatch(authError(error));
  }
};
