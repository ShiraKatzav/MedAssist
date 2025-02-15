
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInjuries, setSelectedInjury, usersCanHelpMe } from '../redux/slicers/injuriesAndSpecializaitionSlicer';
import { sendMail, addRequest } from '../redux/slicers/specialistRequestsSlicer';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Card } from '@mui/joy';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Container ,Box} from '@mui/material';
import image from '../../images/10.png'


function FirstAid() {
  const dispatch = useDispatch();
  const { allInjuries, status, error } = useSelector((state) => state.injuries);

  const [usersCanHelp, setUsersCanHelp] = useState([]);
  const [injury, setInjury] = useState(null);
  const [isShow, setIsShow] = useState(true);
  const [sendEmailToUser, setSendEmailToUser] = useState('');
  const [userId, setUserId] = useState(0);
  const [requesterEmail, setRequesterEmail] = useState('');
  const [showConfirmEmailDialog, setShowConfirmEmailDialog] = useState(false);
  const [formError, setFormError] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [addressValid, setAddressValid] = useState(true);

  useEffect(() => {
    if (sendEmailToUser !== '') {
       handleSendEmail();
    }
    if (status === 'idle') {
       dispatch(fetchInjuries());
    }
  }, [status, dispatch, injury]);

  const handleInjurySelected = (event) => {
    const selectId = event.target.value;
    const selectedMyInjury = allInjuries.find(injury => selectId == injury.id);
    setInjury(selectedMyInjury);
    dispatch(setSelectedInjury(selectedMyInjury));
  };

  const handleChange = (newAddress) => {
    setUserAddress(newAddress);
    setFormError('');
    setAddressValid(true);
  };

  const handleSelect = (selectedAddress) => {
    setUserAddress(selectedAddress);
    setAddressValid(true);
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
        setUserAddress(address);
      } else if (data.status === 'ZERO_RESULTS') {
        setAddressValid(false);
        setFormError('הכתובת אינה תקפה. אנא נסה כתובת אחרת.');
      }
    } catch (error) {
      setFormError('אירעה שגיאה בנסיון לאמת את הכתובת. נסה שוב מאוחר יותר.');
    }
  };

  const handleUsersCanHelp = async (event) => {
    event.preventDefault();
    const injuryDTO = {
      id: injury?.id,
      specialization: { id: injury?.specialization.id },
      address: userAddress,
    };

    const response = await dispatch(usersCanHelpMe(injuryDTO));
    setUsersCanHelp(response.payload);
    setIsShow(false);
  };

  const handleUpdateEmailToUser = (email, userid) => {
    setShowConfirmEmailDialog(true);
    setUserId(userid);
    setSendEmailToUser(email);
  };

  const handleSendEmail = async () => {
    const email = {
      recipient: sendEmailToUser,
      subject: "נכנסה בקשה דחופה",
      msgBody: "http://localhost:5175/login כנס בבקשה לאתר לאשר/לבדוק את הבקשה",
    };
  
    handleAddToRequestsList();
    const response = await dispatch(sendMail(email));
  };

  const handleAddToRequestsList = async () => {
    const request = {
      idSpecailist: userId,
      status: 'false',
      injuryName: injury.name,
      requesterEmail: requesterEmail,
      requesterAddress: userAddress,
    };

    const response = await dispatch(addRequest(request));
    setUserId(0);
    setRequesterEmail('');
  };



 
  return (
    <>

<Container sx={{ textAlign: 'right', padding: 2, backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '15%', marginTop: '3%' }}>

  <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
    <img
      src={image}
      alt="תמונה"
      sx={{
        width: '20%',
        marginRight: 5,
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    />
    <Typography variant="h5" sx={{ lineHeight: 1.8, fontSize: '20px', color: 'rgb(130, 194, 115)', marginRight: 10, marginLeft: 10, marginBottom: 10 }}>
      <h3 style={{ fontWeight: 'bold', color: '#2c6e49', marginBottom: '20px' }}>
        עזרה ראשונה – כאן בשבילך ברגעים קריטיים
      </h3>
      ברוכים הבאים לדף העזרה הראשונה שלנו. אנו כאן כדי לעזור לך להתמודד עם מצבי חירום רפואיים ולחבר אותך לאנשים שיכולים לסייע בזמן אמת.
      אם אתה או מישהו בסביבתך חווה פציעה או מצב רפואי הדורש טיפול מיידי, היכנס כאן כדי לקבל עזרה. בחר את סוג הפציעה או הבעיה הרפואית, הזן את מיקומך, ואנחנו ניצור קשר עם מומחים או אנשים קרובים שיכולים לעזור.
      במקרה של מצבים חמורים, יש לפנות מייד לשירותי החירום המקומיים (כגון מד"א). המערכת שלנו נועדה להעניק סיוע נוסף ולזרז את קבלת העזרה.
    </Typography>
  </Box>

  <Box sx={{ padding: '20px', backgroundColor: '#f0f8f4', marginTop: '30px' }}>
    {isShow && (
      <form onSubmit={handleUsersCanHelp} style={{ backgroundColor: 'rgb(250, 245, 235)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#2c6e49', fontWeight: 'bold' }}>First Aid</h1>
        <div>
          <h2 style={{ color: '#2c6e49' }}>חפש כתובת</h2>
          <PlacesAutocomplete
            value={userAddress}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={{ types: ['address'] }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({ placeholder: 'הקלד עיר...' })}
                  style={{
                    width: '300px',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    marginBottom: '10px',
                  }}
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
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <select
            onChange={handleInjurySelected}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#f0f8f4',
            }}
            required
          >
            <option value="" style={{textAlign:'right'}}>בחר סוג פציעה</option>
            {allInjuries.map((injury) => (
              <option key={injury.id} value={injury.id}>
                {injury.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#2c6e49',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#4caf50' },
          }}
        >
          שלח
        </Button>
      </form>
    )}

    {!isShow && <h2 style={{ color: '#2c6e49', marginTop: '30px' }}>הם יכולים לעזור לך</h2>}

    {usersCanHelp && Array.isArray(usersCanHelp) && usersCanHelp.map((user) => (
      <Card key={user.id} sx={{ padding: '10px', marginBottom: '15px', backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" sx={{ color: '#2c6e49' }}>{user.name+" המשתמש"}</Typography>
        <Typography variant="h6" sx={{ color: '#2c6e49' }}>{user.specialization.specialization+" מתמחה ב"}</Typography>
        <Typography variant="h6" sx={{ color: '#2c6e49' }}>{" גר ב"+user.address}</Typography>
        <Button
          onClick={() => { handleUpdateEmailToUser(user.email, user.id); }}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#2c6e49',
            padding: '8px 15px',
            fontSize: '14px',
            borderRadius: '5px',
            '&:hover': { backgroundColor: '#4caf50' },
          }}
        >
          שלח בקשה
        </Button>
      </Card>
    ))}

<Dialog open={showConfirmEmailDialog} onClose={() => setShowConfirmEmailDialog(false)} sx={{ backgroundColor: '#f0f8f4' }}>
  <DialogTitle sx={{ color: '#2c6e49', fontWeight: 'bold' }}>Confirm Send Email</DialogTitle>
  <DialogContent sx={{ backgroundColor: 'rgb(250, 245, 235)' }}>
    <Typography sx={{ color: '#2c6e49' }}>
      הזן את כתובת המייל שלך על מנת לקבל את הבקשה
    </Typography>
    <TextField
      label="מייל"
      value={requesterEmail}
      onChange={(e) => setRequesterEmail(e.target.value)}
      fullWidth
      required
      sx={{
        marginTop: '10px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #ccc',
        '& .MuiInputBase-root': {
          borderRadius: '5px',
        },
      }}
    />
  </DialogContent>
  <DialogActions sx={{ backgroundColor: 'rgb(250, 245, 235)' }}>
    <Button
      onClick={() => {
        setShowConfirmEmailDialog(false);
        handleSendEmail();
      }}
      sx={{
        backgroundColor: '#2c6e49',
        color: '#fff',
        padding: '8px 15px',
        '&:hover': { backgroundColor: '#4caf50' },
      }}
    >
      שלח ללא מייל
    </Button>
    <Button
      onClick={() => {
        if (requesterEmail !== "") {
          setShowConfirmEmailDialog(false);
          handleSendEmail();
        } else {
          alert("הכנס אימייל"); 
        }
      }}
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: '#2c6e49',
        color: '#fff',
        padding: '8px 15px',
        '&:hover': { backgroundColor: '#4caf50' },
      }}
    >
      שלח מייל
    </Button>
  </DialogActions>
</Dialog>
  </Box>
</Container>
    </>
  );
}

export default FirstAid;