
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../redux/slicers/signUp';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import image from '/Users/moshe/Desktop/REACT JAVA/react/my-react-project/images/10.png';
import PlacesAutocomplete from 'react-places-autocomplete';

function SignUp() {
  const [userName, setUserName] = useState('');
  const [userHouseNumber, setUserHouseNumber] = useState(0);
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressValid, setAddressValid] = useState(true);

  useEffect(() => {
    localStorage.removeItem('userLogin');
  }, []);


  const handleChange = (newAddress) => {
    setUserAddress(newAddress);
    setFormError('');
    setAddressValid(true);
  };

 
  const handleSelect = (selectedAddress) => {
    setUserAddress(selectedAddress);
    validateAddress(selectedAddress); 
  };


  const validateAddress = async (address) => {
    const API_KEY = ''; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        setAddressValid(true);
      } else if (data.status === 'ZERO_RESULTS') {
        setAddressValid(false);
        setFormError('הכתובת אינה תקפה. אנא נסה כתובת אחרת.');
      }
    } catch (error) {
      setFormError('אירעה שגיאה בנסיון לאמת את הכתובת. נסה שוב מאוחר יותר.');
    }
  };


  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    if (!userName) {
      setFormError('השם לא יכול להיות ריק.');
      return false;
    }
    if (userPassword.length < 6) {
      setFormError('הסיסמה חייבת להכיל לפחות 6 תווים.');
      return false;
    }
    if (!validateEmail(userEmail)) {
      setFormError('כתובת האימייל אינה תקינה.');
      return false;
    }
    if (!validatePhone(userPhone)) {
      setFormError('מספר טלפון חייב להיות 10 ספרות.');
      return false;
    }
    if (!userHouseNumber) {
      setFormError('מספר בית חייב להיות מספר.');
      return false;
    }
    if (!addressValid || !userAddress) {
      setFormError('כתובת לא תקינה.');
      return false;
    }
    return true;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!validateForm()) {
      return;
    }

    try {
      const user = { 
        name: userName, 
        password: userPassword, 
        email: userEmail, 
        phone: userPhone, 
        address: userAddress, 
        houseNumber: userHouseNumber, 
        latitude: 0, 
        longitude: 0 
      };
      const resultAction = await dispatch(signUp(user));

      if (signUp.fulfilled.match(resultAction)) {
        console.log('User signed up successfully');
        navigate('/');
      } else if (signUp.rejected.match(resultAction)) {
        const error = resultAction.payload;
        if (error.status === 409) {
          setFormError('הדוא"ל כבר קיים במערכת. נא נסה דוא"ל אחר.');
        } else {
          setFormError('אירעה שגיאה. נא נסה שנית.');
        }
      }
    } catch (error) {
      console.error(error);
      setFormError('אירעה שגיאה בלתי צפויה. נא נסה שנית.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px', marginLeft: '90%' }}>
      <Box
        sx={{
          backgroundColor: 'rgb(243, 236, 222)',
          padding: '10%',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src={image}
          alt="My Image"
          style={{
            width: '30%',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
        <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ color: 'rgb(130, 194, 115)' }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            margin="normal"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            variant="outlined"
            margin="normal"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="House Number"
            type="tel"
            variant="outlined"
            margin="normal"
            value={userHouseNumber}
            onChange={(e) => setUserHouseNumber(e.target.value)}
            required
          />

          <div>
            <h2>חפש כתובת</h2>
            <PlacesAutocomplete
              value={userAddress}
              onChange={handleChange}
              onSelect={handleSelect}
              searchOptions={{
                types: ['address'], 
              }}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                  <input
                    {...getInputProps({ placeholder: 'הקלד עיר...' })}
                    style={{ width: '300px', padding: '8px' }}
                  />
                  <div>
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion, {
                          className: 'suggestion-item',
                          style: {
                            backgroundColor: suggestion.active ? '#d3d3d3' : '#fff',
                            cursor: 'pointer',
                          },
                        })}
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div>
              <strong>כתובת נבחרת:</strong> {userAddress}
            </div>
          </div>

          {formError && (
            <Alert severity="error" sx={{ marginTop: '20px' }}>
              {formError}
            </Alert>
          )}

          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;

