import axios from 'axios';
const axiosInstance = axios.create({
  withCredentials: true,
});


const API_URL = 'http://localhost:8080/api/injuries';


export const getInjuries = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/allInjuriess`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching injuries:", error);
    throw error;
  }
};


export const getInjuriesById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/injuriesById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching injury by id:", error);
    throw error;
  }
};


export const addInjury = async (injury) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/addInjuries`, injury);
    return response.data; 
  } catch (error) {
    console.error("Error adding injury:", error);
    throw error;
  }
};


export const updateInjury = async (id, injury) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/updateInjuries/${id}`, injury);
    return response.data;
  } catch (error) {
    console.error("Error updating injury:", error);
    throw error;
  }
};


export const deleteInjury = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/deleteInjuries/${id}`);
    return response.status; 
  } catch (error) {
    console.error("Error deleting injury:", error);
    throw error;
  }
};

export const usersCanHelp=async(injuryDTO)=>{
  try{
    const response=await axiosInstance.post(`${API_URL}/findUsersByInjuries`,injuryDTO)
    return response.data
  }catch(err){
    console.log(err);
    
    throw err
  }
}