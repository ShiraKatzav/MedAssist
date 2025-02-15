import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});


const API_URL = 'http://localhost:8080/api/medicineName';


export const getNameMedication = async () => {
    console.log("hiii");
    
    try {
      const response = await axiosInstance.get(`${API_URL}/allNameMedicines`);
      console.log(response);
      
      return response.data; 
    } catch (error) {
      console.error("Error fetching medication reminders:", error);
      throw error;
    }
  };