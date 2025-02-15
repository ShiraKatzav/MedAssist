import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});


const API_BASE_URL = "http://localhost:8080/api/specialization"; 


export const getAllSpecializations = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/allSpecializations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching specializations", error);
    throw error;
  }
};


export const getSpecializationById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/specializationById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching specialization with ID ${id}`, error);
    throw error;
  }
};


export const addSpecialization = async (specialization) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/addSpecialization`, specialization);
    return response.data;
  } catch (error) {
    console.error("Error adding specialization", error);
    throw error;
  }
};


export const updateSpecialization = async (id, specialization) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/updateSpecialization/${id}`, specialization);
    return response.data;
  } catch (error) {
    console.error(`Error updating specialization with ID ${id}`, error);
    throw error;
  }
};


export const deleteSpecialization = async (id) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/deleteSpecialization/${id}`);
  } catch (error) {
    console.error(`Error deleting specialization with ID ${id}`, error);
    throw error;
  }
};

