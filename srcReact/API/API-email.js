import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
  });
  

const API_URL = 'http://localhost:8080/api/email';

export const sendEmail=async(email)=>{
    console.log(email);
    
    try{
       const respone=await axiosInstance.post(`${API_URL}/sendMail`,email);
       console.log(respone);
       
       return respone
    }
    catch(err){
    console.log(err);
    
    }
}
