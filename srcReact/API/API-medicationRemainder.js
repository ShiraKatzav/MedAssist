import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});



const API_URL = 'http://localhost:8080/api/medicationRemainder';


export const getMedicationReminders = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/allMedicationReminders`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching medication reminders:", error);
    throw error;
  }
};


export const getMedicationReminderById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/allMedicationRemindersByUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching medication reminder by id:", error);
    throw error;
  }
};


export const addMedicationReminder = async (medicationReminder) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/addMedicationReminder`, medicationReminder);
    return response.data; 
  } catch (error) {
    console.error("Error adding medication reminder:", error);
    throw error;
  }
};

export const updateMedicationReminder = async (id, medicationReminder) => {

  
  try {
    const response = await axiosInstance.put(`${API_URL}/updateMedicationReminder/${id}`, medicationReminder);
    return response.data; 
  } catch (error) {
    console.error("Error updating medication reminder:", error);
    throw error;
  }
};


export const DeleteMedicationReminder = async (id) => {
  console.log(id);
  
  try {
    const response = await axiosInstance.delete(`${API_URL}/deleteMedicationReminder/${id}`);
    console.log(response);
    
    return response.data; 
  } catch (error) {
    console.error("Error deleting medication reminder:", error);
    throw error;
  }
};


export const addScheduledEmailToReminder=async(scheduledEmail)=>{
  try{
    const respone=await axiosInstance.post(`${API_URL}/scheduleEmail`,scheduledEmail)
    console.log(respone);
    return respone 
  }
  catch(err){
   console.log(err);
   
  }
}