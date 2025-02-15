import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});


const API_URL = 'http://localhost:8080/api/questions'; 


export const createQuestion = async (questionData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/createQuetion`, questionData);
    return response;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};


export const getAllQuestions = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/getAllQuestions`);
    return response; 
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};


export const getQuestionById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/getQuestion/${id}`);
    return response; 
  } catch (error) {
    console.error('Error fetching question by ID:', error);
    throw error;
  }
};


export const updateQuestion = async (id, updatedQuestionData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/updateQuastion/${id}`, updatedQuestionData);
    return response; 
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};


export const deleteQuestion = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/deleteQuestion/${id}`);
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};