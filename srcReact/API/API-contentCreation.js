import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});



const API_URL = 'http://localhost:8080/api/contentCreation';


export const getContentCreations = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/allContentCreations`);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching content creations:", error);
    throw error;
  }
};


export const getContentCreationById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/contentCreationById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching content creation by id:", error);
    throw error;
  }
};

export const addPost = async (contentCreation) => {
  console.log(contentCreation);
  try {
    const response = await axiosInstance.post(`${API_URL}/addContentCreation`,contentCreation);
    console.log(response);
    
    return response.data; 
  } catch (error) {
    console.error("Error adding content creation:", error);
    throw error;
  }
};

export const addContentCreation = async (formData) => {
  console.log(formData);
  try {
    const response = await axiosInstance.post(`${API_URL}/addContentCreationImage`, formData);
    console.log(response);
    
    return response.data; 
  } catch (error) {
    console.error("Error adding content creation:", error);
    throw error;
  }
};


export const updateContentCreation = async (id, contentCreation) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/updateContentCreation/${id}`, contentCreation);
    return response.data; 
  } catch (error) {
    console.error("Error updating content creation:", error);
    throw error;
  }
};


export const deleteContentCreation = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/deleteContentCreation/${id}`);
    return response.status; 
  } catch (error) {
    console.error("Error deleting content creation:", error);
    throw error;
  }
};