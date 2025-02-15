import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});



const API_URL = 'http://localhost:8080/api/users';


export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/allUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};


export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/usersById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};


export const signUpUser = async (user) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signUpUser`, user);
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return error.response;
  }
};


export const updateUser = async (id, user) => {
  console.log(id);
  console.log(user);
  
  
  try {
    const response = await axiosInstance.put(`${API_URL}/updateUsers/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};


export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/deleteUsers/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export const isExist = async (user) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/isExist`, user);
    return response;
  } catch (error) {
    console.error("user is not found:", error);
    return error.response;
  }
};

export const signOut = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signout`);
    return response;
  } catch (error) {
    console.error("user is not found:", error);
    return error.response;
  }
};