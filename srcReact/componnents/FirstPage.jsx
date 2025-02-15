import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container} from '@mui/material';
import image from '../../images/10.png'
import { signOut } from '../API/API-users';


const FirstPage = () => {

  useEffect(() => {
    const signOutUser = async () => {
      try {
        localStorage.removeItem('userLogin'); 
        await signOut();
      } catch (error) {
        console.error('Error during sign out:', error);
      }
    };

    signOutUser(); 
  }, []); 
  return (
    <>
      <Container
        sx={{
          backgroundColor: 'rgb(243, 236, 222)', 
          height: '100vh', 
          width: '60vw',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column', 
          position: 'absolute', 
          top: '50%',
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          padding: '20px', 
        }}
      >
        
        <img
          src={image} 
          alt="My Image"
          style={{
            width: '20%',
            height: 'auto', 
            borderRadius: '10px', 
            marginBottom: '20px', 
          }}
        />

      
        <h1>Welcome</h1>
        <h2>We're happy you will enjoy us!</h2>
        <h2>If you need first aid, just click up without login.</h2>
      </Container>
    </>
  );
};

export default FirstPage;