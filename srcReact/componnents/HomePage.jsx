import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar,InputLabel,Select, Button, Box,
   MenuItem,Typography, Dialog, DialogActions, DialogContent
   , DialogTitle,Container } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import  { useState,useEffect,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories} from '../redux/slicers/categoriesSlicer';
import { fetchContentCreation} from "../redux/slicers/contentCreationSlicer";
import {Avatar,IconButton,FormControl} from '@mui/joy'
import { getAllSpecialization } from '../redux/slicers/injuriesAndSpecializaitionSlicer';
import { updateUser } from '../API/API-users'; 
import { setSelectedCategory } from '../redux/slicers/categoriesSlicer';
import image from '../../images/10.png'

const HomePage=()=>{
  
      const { allCategories, status, error } = useSelector((state) => state.categories);
      const allContentCreation = useSelector((state) => state.contentCreation.allContentCreation);
      const allSpecialization=useSelector((state)=>state.injuries.allSpecialization)
      const [specialization,setSpecialization]=useState(null);
      const [openDialog, setOpenDialog] = useState(false);
       const [anchorEl, setAnchorEl] = useState(null);
       const [user, setUser] = useState(null);
       const [message, setMessage] = useState('');
      const dispatch=useDispatch();
      const navigate = useNavigate();
      useEffect(()=>{
        const userFromStorage = JSON.parse(localStorage.getItem('userLogin'))
        if (userFromStorage) {
          setUser(userFromStorage);
       }
        try{
          
         if (status === 'idle') {
          dispatch(fetchCategories());  
          dispatch(fetchContentCreation());
          dispatch(getAllSpecialization());
        }
      }
        catch(error){
          console.error(error)
      }
      
 }, [status, dispatch])
   
      


       if (status === 'loading') return <div>Loading...</div>;
       if (status === 'failed') return <div>Error: {error}</div>;
       console.log(allCategories)
       console.log(allSpecialization);
       
  const handleUpdateSpecialization=async()=>{
    
    if (specialization&&user.specialization==null) {
      user.specialization=allSpecialization.find(S=>S.id==specialization)
      console.log(user);
      
      const respone=await updateUser(user.id,user)
      console.log(respone);
      localStorage.setItem('userLogin',JSON.stringify(respone))
      setUser(JSON.parse(localStorage.getItem('userLogin')))
      setMessage('תודה על ההתנדבות! ניצור קשר בהקדם.');
      window.location.reload();
    }
    else if(user.specialization!=null)
      setMessage('אתה מתנדב רשום תודה לך');
   

  }



  const handleCloseMenu = () => {
    setAnchorEl(null);
  };



  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const scrollc = (direction) => {
    const container = document.getElementById('category-carousel');
    const scrollAmount = 200; 
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };


    return (
        <>
      
          <Box style={{ marginTop: '10%' ,textAlign:'center',marginLeft:'30%'}}>
        <h1 style={{ color: '#2c6e49'}}> {user?.name}:ברוך הבא</h1>
      </Box>
     

    
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Full Profile</DialogTitle>
        <DialogContent>
        
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src="/static/logo.png" alt={user?.name} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <h3>{user?.name}</h3>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Specialization:</strong> {user?.specialization?.specialization || 'Not Set'}</p>
            <p><strong>Phone:</strong> {user?.phone || 'Not Set'}</p>
          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    
    


     
 
<div>
  <Container sx={{ textAlign: "right", padding: 4, backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '15%',marginTop:'5%' }}>
    <Box sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
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
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c6e49', marginLeft: "63%" }}>
        קצת עלינו
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '20px', color: 'rgb(130, 194, 115)', marginRight: 10, marginLeft: 10 ,marginBottom:10}}>
      הקמנו את אתר  מתוך מטרה להעניק לאנשים פתרונות יעילים ונגישים במצבי חירום רפואיים.
      האתר מציע למשתמשים אפשרות לשתף ולשמור מידע חשוב כמו גם להציע דרך קלה להתנדב ולעזור
      ולהעלות שאלות ותשובות רפואיות או תוכן שיכול לעזור לאחרים. 
      בנוסף, האתר כולל מערכת תזכורות אישית שנועדה לוודא שהמשתמשים יזכרו לקחת את תרופותיהם בזמנים הנכונים, 
      ובכך לשפר את הבריאות האישית של כל אחד. 
      כל זאת במטרה ליצור קהילה תומכת ומחוברת,
      שיכולה להציע עזרה ומידע בזמן אמת ולשפר את איכות החיים והביטחון האישי של כל אחד מהמשתמשים.
    </Typography>
  </Container>
</div>


<Container sx={{ marginLeft: '15%',textAlign: "right", padding: 4, backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: 5, marginBottom: 5 }}>
  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c6e49', marginBottom: 3 }}>
    תזכורת: אל תשכח לקחת את התרופות שלך!
  </Typography>
  <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '18px', color: 'rgb(130, 194, 115)', marginBottom: 3 }}>
    הקפדה על לקיחת התרופות בזמן היא חלק חשוב בשמירה על הבריאות שלך. אנחנו כאן כדי לעזור לך 
    אם תרצה, נוכל לשלוח לך תזכורת ישירות למייל שלך, כך שתוכל להיות בטוח שלא תשכח לקחת את התרופות בזמן.
  </Typography>
  <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '18px', color: 'rgb(130, 194, 115)', marginBottom: 3 }}>
    אל תהסס להירשם ולקבל תזכורות מותאמות אישית למייל, ולהרגיש בטוח בכל שלב של הדרך.
  </Typography>
  <Button onClick={() => navigate(`/medicineReminder/${user.id}`)} variant="contained" sx={{ backgroundColor: '#2c6e49', color: 'white', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', '&:hover': { backgroundColor: '#4caf50' } }}>
    הירשם לקבלת תזכורות
  </Button>
</Container>


<div>
  <Container sx={{marginTop:"5%", marginLeft: '15%', textAlign: "right", padding: 5, backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c6e49', marginBottom: 2 }}>
      רוצה להתנדב
    </Typography>
    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '18px', color: 'rgb(130, 194, 115)', marginBottom: 3 }}>
      ההתנדבות באתר "עזרה ראשונה" לא רק כוללת העלאת תוכן ושאלות, אלא גם להיות זמין לקריאות עזרה בזמן אמת.
      כל מי שמוכן לתרום מזמנו יכול להיות חלק מהמערכת התומכת שלנו, ולסייע לאנשים במצבי חירום רפואיים או במצבים דחופים.
      זהו תפקיד חשוב שיכול לשפר את הביטחון של המשתמשים ולהיות עזר משמעותי בזמני מצוקה, תוך יצירת תחושת קהילה ושיתוף פעולה.
    </Typography>

    <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: 2, color: '#2c6e49' }}>
      אנא בחר את ההתמחות שלך אם אתה מעוניין להתנדב:
    </Typography>

       <FormControl 
      fullWidth 
      variant="outlined" 
      style={{ marginBottom: '15px' }}
    >
      <InputLabel id="specialization-label">בחר התמחות</InputLabel>
      <Select
        labelId="specialization-label"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        label="בחר התמחות"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: '#ddd',
          },
          '& .MuiSelect-icon': {
            color:'rgb(130, 194, 115)', 
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(130, 194, 115)', 
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888', 
          },
        }}
      >
        <MenuItem value="">
          <em>בחר התמחות</em>
        </MenuItem>
        {allSpecialization?.map((specializationItem) => (
          <MenuItem key={specializationItem.id} value={specializationItem.id}>
            {specializationItem.specialization}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <button onClick={handleUpdateSpecialization} style={{ padding: '10px 20px', backgroundColor: '#2c6e49', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      שלח
    </button>
    {message && (
          <Typography variant="body1" sx={{ marginTop: 3, color: message.includes('תודה') ? 'green' : 'red', fontWeight: 'bold' }}>
            {message}
          </Typography>
        )}
  </Container>
</div>

    
<Container sx={{marginTop:"5%", marginLeft: '15%', textAlign: "right", padding: 5, backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: 4 }}>
      <Typography variant="h2" gutterBottom align="center" style={{ color: '#2c6e49'}}>
        Categories
      </Typography>
      <Typography variant="h5" gutterBottom align="center" style={{marginRight:'5%',color: 'rgb(130, 194, 115)',padding:'5%'}}>
       אם תרצה לקבל תשובות לשאלותיך בנושאים מסויים או לעזור לאחרים כאן זה המקום!
      </Typography>

   
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden',marginRight:"6%"}}>
      
        <IconButton
          onClick={() => scrollc('left')}
          sx={{
            position: 'absolute',
            left: 0,
            zIndex: 10,
            backgroundColor: '#fff',
           
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ArrowBack />
        </IconButton>

     
        <Box
          id="category-carousel"
          sx={{
            display: 'flex',
            overflowX: 'hidden', 
            gap: 2,
            paddingBottom: '10px',
            scrollBehavior: 'smooth',
            paddingLeft: '50px', 
            marginLeft:'8%'
          }}
        >
          {allCategories?.map((category) => (
            <Button
              key={category.id}
              component={Link}
              to={`/questionsPage/${category.id}`}
              onClick={() => dispatch(setSelectedCategory(category))}
              variant="contained"
              sx={{
                borderRadius: '50%', 
                width: 100, 
                height: 100, 
                backgroundColor: '#2c6e49',
                padding: "7%", 
                '&:hover': {
                  backgroundColor: '#4caf50', 
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'none',
                marginLeft: '2%',
                background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
                color: 'rgb(130, 194, 115)',
                border: 'none',
                borderRadius: '50%',
               
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
              <Typography variant="h6" color="white" align="center">
                {category.name}
              </Typography>
            </Button>
          ))}
        </Box>

      
        <IconButton
          onClick={() => scrollc('right')}
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 10,
            backgroundColor: '#fff',
           
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Container>


    <div>
  <Container sx={{ textAlign: "right", padding: 4, backgroundColor: 'rgb(250, 245, 235)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '15%' ,marginBottom:"10%"}}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c6e49', marginBottom: 3 }}>
      הצטרפו לקהילה – שתפו את הידע שלכם
    </Typography>
    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '18px', color: 'rgb(130, 194, 115)', marginBottom: 3 }}>
      באתר "עזרה ראשונה" אנו שואפים ליצור קהילה תומכת ומחויבת, שתסייע אחד לשני במצבים רפואיים דחופים. 
      אם יש לך ידע או ניסיון שיכול לעזור לאחרים, אנו מזמינים אותך לשתף תוכן מועיל שיסייע למי שצריך עזרה. 
      בין אם מדובר בטיפים רפואיים, הסברים על טיפול ראשוני במצבי חירום, או עצות מעשיות לכל מי שמעוניין ללמוד כיצד להתמודד עם מצבים רפואיים, 
      כל תרומה יכולה להיות בעלת ערך עצום.
    </Typography>
    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '18px', color: 'rgb(130, 194, 115)', marginBottom: 3 }}>
      אל תהסס לשתף את הידע שלך ולהפוך אותו לנגיש עבור כולם – ביחד נוכל להעניק עזרה ראשונה אמיתית וחשובה לכל אדם בזמן אמת.
      לחצו כאן
    </Typography>
    <Button onClick={() => navigate('/contentCreation')} sx={{ padding: '10px 20px', backgroundColor: '#2c6e49', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>התוכן שלנו</Button>
  </Container>
</div>

        </>
      );
    };
    
    export default HomePage;