
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUserExistence } from '../redux/slicers/loginSlicer';
import { TextField, Button, Typography, Container, Paper ,Grid2,Box} from '@mui/material';
import image from '../../images/10.png'


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
 
   useEffect(()=>{
    localStorage.removeItem('userLogin'); 
   })


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { name: userName, password: userPassword, email: userEmail };

    try {

      const action = checkUserExistence(user);  

      const resultAction = await dispatch(action);  
      if (checkUserExistence.fulfilled.match(resultAction)) {
        console.log(resultAction.payload)
        localStorage.setItem('userLogin',JSON.stringify(resultAction.payload))
        console.log("good")
        navigate('/homePage')
      }
      else if (checkUserExistence.rejected.match(resultAction)) {
        const statusCode = resultAction.payload?.status || resultAction.error?.message;
        console.log('Error status:', statusCode);  
        
        
        if (statusCode === 404) {
          setMessage('User not found');
          setUserPassword('');
          setUserName('');
          navigate('/signUp');
        } else if (statusCode === 400) {
          setMessage('Incorrect username or password');
          setUserPassword('');
          setUserName('');
        } else {
          setMessage('Unknown error occurred');
        }
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    
    <>
    <div>
   
   <Container component="main" maxWidth="xs"
      sx={{
       marginLeft:'150%',
       backgroundRepeat: 'no-repeat', 
       height: '100vh',
       width: '100%', 
       display: 'flex', 
       justifyContent: 'center', 
       alignItems: 'center', 
       flexDirection: 'column' 
      }}
    >
     
      <Paper
        elevation={3}
        sx={{
          marginLeft:5,
          padding: 6,
          backgroundColor: 'rgb(243, 236, 222)', 
          width: '80%', 
        }}
      >
         <img
          src={image} 
          alt="My Image"
          style={{
            width: '40%', 
            height: 'auto', 
            borderRadius: '10px', 
            marginBottom: '20px',
          }}
        />
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 ,color:'rgb(130, 194, 115)'}}>
          <h3>Login</h3>
        </Typography>

        
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={4} direction="column">
            <Grid2 item>
              <TextField
                variant="outlined"
                label="Username"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                fullWidth
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item>
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                fullWidth
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                onKeyPress={handleKeyPress}
                sx={{
                  marginLeft: '2%',
                  background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
                  color: 'rgb(130, 194, 115)',
                  border: 'none',
               
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(to right, ##2e7d32, #a8e6b1)', 
                    transform: 'scale(1.05)', 
                    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)', 
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                Login
              </Button>
           
            </Grid2>
          </Grid2>
        </form>

        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
         
          <Button
           fullWidth
            variant="outlined"
            color="primary"
            onClick={() => navigate('/signUp')}

            sx={{
              marginLeft: '2%',
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(to right, ##2e7d32, #a8e6b1)', 
                transform: 'scale(1.05)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.95)',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
              },
            }}

          >
            Sign Up
          </Button>
        </Box>

        {message && (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
    </div>
    </>
   
  );
};

export default Login;

