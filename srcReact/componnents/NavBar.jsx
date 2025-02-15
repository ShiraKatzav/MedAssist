import React, { useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Box, Tooltip, Menu, Typography, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Avatar, Grid2
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Nav = () => {


  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage = JSON.parse((localStorage.getItem('userLogin')))
    setUser(userLocalStorage)

  }, [location])


  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);

  };


  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

 
  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseMenu();  
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenUpdateDialog(false);
  };



  return (
    <>

      {!user && <AppBar position="fixed" style={{ backgroundColor: 'rgb(162, 219, 173)', width: '100%', zIndex: 1301, padding: '1%' }}>
        <Toolbar style={{ display: 'flex', width: '100%' }}>

          <Button onClick={() => navigate('/signUp')}
            sx={{
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px', 
              padding: '12px 30px', 
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              marginRight: '3%',
              '&:hover': {
                background: 'linear-gradient(to right, #2e7d32, #a8e6b1)', 
                transform: 'scale(1.05)', 
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.95)', 
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
              },
            }}>
            Sign Up
          </Button>

        
          <Button color="inherit" onClick={() => navigate('/login')}
            sx={{
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px', 
              padding: '12px 30px', 
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              marginRight: '3%',
              '&:hover': {
                background: 'linear-gradient(to right, #2e7d32, #a8e6b1)',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.95)',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
              },
            }}>
            Login
          </Button>

         
          <Button color="inherit" onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px', 
              padding: '12px 30px', 
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              marginRight: '3%',
              '&:hover': {
                background: 'linear-gradient(to right, #2e7d32, #a8e6b1)',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.95)',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
              },
            }}>
            Entrance
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px', 
              position: 'relative',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 10px rgba(244, 67, 54, 0.8), 0 0 20px rgba(244, 67, 54, 0.6), 0 0 30px rgba(244, 67, 54, 0.4)',
              padding: '12px 30px', 
              marginLeft: '52%',
              '&:hover': {
                backgroundColor: '#d32f2f',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4)',
                boxShadow: '0 0 20px rgba(244, 67, 54, 1), 0 0 30px rgba(244, 67, 54, 0.8), 0 0 40px rgba(244, 67, 54, 0.6)',
                transform: 'scale(1.05)',
              }
            }}
            onClick={() => navigate('/firstAid')}
          >
            עזרה ראשונה
          </Button>
        </Toolbar>
      </AppBar>}

       {/* --------------------------------if use login----------------------------------- */}
      {user && <AppBar position="fixed" style={{ backgroundColor: 'rgb(162, 219, 173)', width: '100%', zIndex: 1301., padding: 5 }}>

        <Toolbar>
          <Button color="inherit"
            variant="contained"

            sx={{
              marginLeft: '2%',
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px',
              
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
            onClick={() => navigate('/contentCreation')}>
            our content
          </Button>




          <Button color="inherit"
            variant="contained"

            sx={{
              marginLeft: '2%',
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px',
             
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
            onClick={() => navigate(`/medicineReminder/${user.id}`)}>
            your medication reminder
          </Button>


          <Button
            sx={{
              marginLeft: '2%',
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px',
          
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
            color="inherit"
            onClick={() => navigate('/homePage')}>
            home page
          </Button>

          {user.specialization && <Button
            sx={{
              marginLeft: '2%',
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px',

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
            color="inherit"
            onClick={() => navigate(`/specailistsRequests/${user.id}`)}>
            requests
          </Button>}
          <Button color="inherit"
            variant="contained"

            sx={{
              marginLeft: '2%',
              background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
              color: 'rgb(130, 194, 115)',
              border: 'none',
              borderRadius: '50px',
     
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
            onClick={() => {
              localStorage.removeItem('userLogin'); 
              navigate('/'); 
            }}>
            sign out
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px', 
              position: 'relative',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 10px rgba(244, 67, 54, 0.8), 0 0 20px rgba(244, 67, 54, 0.6), 0 0 30px rgba(244, 67, 54, 0.4)',
        
              marginLeft: '25%',
              '&:hover': {
                backgroundColor: '#d32f2f',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4)',
                boxShadow: '0 0 20px rgba(244, 67, 54, 1), 0 0 30px rgba(244, 67, 54, 0.8), 0 0 40px rgba(244, 67, 54, 0.6)',
                transform: 'scale(1.05)',
              }
            }}
            onClick={() => navigate('/firstAid')}
          >
            עזרה ראשונה
          </Button>

          {user && (
            <Tooltip title="View Profile" arrow>
              <IconButton
                sx={{
                  marginLeft: 'auto',  
                  backgroundColor: 'rgb(130, 194, 115)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgb(100, 160, 85)',
                  },
                  borderRadius: '50%',  
                  padding: '10px',
                }}
                onClick={handleProfileClick} 
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          )}

          {/* profil*/}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} 
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{ padding: 2, minWidth: 250, backgroundColor: '#f0f8f4', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '2%' }}>
          
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src="/static/logo.png" alt={user?.name} sx={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid #2c6e49' }} />
                <div>
                  <Typography variant="h6" sx={{ color: '#2c6e49', fontWeight: 'bold' }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#2c6e49' }}>
                    Email: {user?.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2c6e49' }}>
                    Specialization: {user?.specialization?.specialization || 'Not Set'}
                  </Typography>
                </div>
              </Box>
              <Button
                onClick={handleOpenDialog}
                sx={{
                  marginTop: 2,
                  backgroundColor: '#2c6e49',
                  color: '#fff',
                  padding: '8px 15px',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: '#4caf50' },
                }}
              >
                View Full Profile
              </Button>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>}


{/* ---------------------------full profil----------------------------- */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ backgroundColor: 'rgb(130, 194, 115)', color: '#fff', fontWeight: 'bold' }}>
          פרופיל מלא
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f0f8f4', padding: 3 }}>
          {/* הצגת פרטי המשתמש בחלונית */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "2%" }}>
            <Avatar
              src="/static/logo.png"
              alt={user?.name}
              sx={{
                width: 100,
                height: 100,
                marginBottom: 2,
                borderRadius: '50%', 
                border: '3px solid #2c6e49', 
              }}
            />
            <Typography variant="h5" sx={{ color: '#2c6e49', fontWeight: 'bold' }}>
              {user?.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#2c6e49', marginBottom: 1 }}>
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1" sx={{ color: '#2c6e49', marginBottom: 1 }}>
              <strong>Specialization:</strong> {user?.specialization?.specialization || 'Not Set'}
            </Typography>
            <Typography variant="body1" sx={{ color: '#2c6e49', marginBottom: 1 }}>
              <strong>Phone:</strong> {user?.phone || 'Not Set'}
            </Typography>
            <Typography variant="body1" sx={{ color: '#2c6e49', marginBottom: 1 }}>
              <strong>Address:</strong> {user?.address || 'Not Set'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#f0f8f4' }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: '#2c6e49',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#4caf50' },
            }}
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Nav;