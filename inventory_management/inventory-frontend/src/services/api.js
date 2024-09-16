// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';

// // Fetch equipment list
// export const getEquipmentList = async () => {
//   const response = await axios.get(`${API_URL}/equipment/`);
//   return response.data;
// };

// // Fetch requests list
// export const getRequestList = async () => {
//   const response = await axios.get(`${API_URL}/requests/`);
//   return response.data;
// };

// // Login user
// export const loginUser = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/api-token-auth/`, {
//       username,
//       password
//     });
//     return response.data;  // Backend response contains token, username, etc.
//   } catch (error) {
//     // Provide more detailed error response for frontend
//     if (error.response && error.response.data) {
//       throw error;
//     } else {
//       throw new Error('An unexpected error occurred.');
//     }
//   }
// };

// // Change password
// export const changePassword = async (passwordData) => {
//   const response = await axios.post(`${API_URL}/change-password/`, passwordData);
//   return response.data;
// };

// // Register user
// export const registerUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/register/`, userData);
//   return response.data;
// };

// // Add equipment
// export const addEquipment = async (equipmentData) => {
//   const response = await axios.post(`${API_URL}/equipment/`, equipmentData);
//   return response.data;
// };

// // Add request
// export const addRequest = async (requestData) => {
//   const response = await axios.post(`${API_URL}/requests/`, requestData);
//   return response.data;
// };

// // Fetch user list
// export const getUserList = async () => {
//   const response = await axios.get(`${API_URL}/users/`);
//   return response.data;
// };

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Add token to request headers
const authHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Token ${token}` } : {};
};

// Fetch equipment list
export const getEquipmentList = async () => {
  const response = await axios.get(`${API_URL}/equipment/`, {
    headers: authHeaders(),  // Add token to headers
  });
  return response.data;
};

// Fetch requests list
export const getRequestList = async () => {
  const response = await axios.get(`${API_URL}/requests/`, {
    headers: authHeaders(),  // Add token to headers
  });
  return response.data;
};

// Login user
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api-token-auth/`, {
      username,
      password,
    });

    const token = response.data.token;
    const role = response.data.role;
    const user = response.data.username;  // Assuming backend returns 'username'

    // Store token and other details in localStorage
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);  // Store role
      localStorage.setItem('username', user);  // Store username or user identifier
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await axios.post(`${API_URL}/change-password/`, passwordData, {
    headers: authHeaders(),  // Add token to headers
  });
  return response.data;
};

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData, {
    headers: authHeaders(),  // Add token to headers if needed
  });
  return response.data;
};

// Add equipment
export const addEquipment = async (equipmentData) => {
  const response = await axios.post(`${API_URL}/equipment/`, equipmentData, {
    headers: authHeaders(),  // Add token to headers
  });
  return response.data;
};

// Add request
export const addRequest = async (requestData) => {
  const response = await axios.post(`${API_URL}/requests/`, requestData, {
    headers: authHeaders(),  // Add token to headers
  });
  return response.data;
};

// Fetch user list
export const getUserList = async () => {
  const response = await axios.get(`${API_URL}/users/`, {
    headers: authHeaders(),  // Add token to headers
  });
  return response.data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
};
