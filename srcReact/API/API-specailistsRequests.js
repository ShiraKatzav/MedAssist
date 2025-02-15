import axios from 'axios';


const axiosInstance = axios.create({
  withCredentials: true,
});
const API_URL='http://localhost:8080/api/specailistsRequests'


export const getRequestByUserId=async(id)=>{
  try{
    const respone= await  axiosInstance.get(`${API_URL}/requestByUserId?userId=${id}`);
    console.log(respone);
    return respone.data
  }
  catch(err){
    throw err
  }
}

export const addSpecialistRequest=async(request)=>{
    try{
  
     const respone= await  axiosInstance.post(`${API_URL}/addRequest`,request);
     console.log(respone);
     return respone.data
  
    }
    catch(err){
      throw err
    }
  }
  export const deleteSpecialistRequest=async(id)=>{
    console.log(id);
    
    try{
  
     const respone= await  axiosInstance.delete(`${API_URL}/deleteRequest/${id}`);
     console.log(respone);
     return respone.data
  
    }
    catch(err){
      throw err
    }
  }