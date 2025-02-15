import axios from 'axios';
const axiosInstance = axios.create({
  withCredentials: true,
});

const API_URL = 'http://localhost:8080/api/category';  


export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/allCategories`);
    return response.data;  
  } catch (error) {
    console.log(error.status)
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/categoryById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};


export const addCategory = async (category) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/addCategory`, category);
    return response.data;  
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};


export const updateCategory = async (id, category) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/updateCategory/${id}`, category);
    return response.data; 
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};


export const deleteCategory = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/deleteCategory/${id}`);
    return id; 
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getQuestionsWithAnswersForCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${categoryId.id}/questionsWithAnswers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions with answers for category:', error);
    throw error;
  }
};