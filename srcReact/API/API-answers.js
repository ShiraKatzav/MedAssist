import axios from 'axios';
const axiosInstance = axios.create({
  withCredentials: true,
});


const API_URL = 'http://localhost:8080/api/answers'; 


export const createAnswer = async (questionId, answerData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/question/${questionId}`, answerData);
    return response; 
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
};


export const getAnswersForQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/question/${questionId}`);
    return response; 
  } catch (error) {
    console.error('Error fetching answers for question:', error);
    throw error;
  }
};


export const updateAnswer = async (id, updatedAnswerData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/updateAnswer/${id}`, updatedAnswerData);
    return response; 
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};


export const deleteAnswer = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/deleteAnswer/${id}`);
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error;
  }
};
