import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './componnents/Login';
import FirstAid from './componnents/FirstAid'
import SignUp from './componnents/SignUp';
import FirstPage from './componnents/FirstPage';
import QuestionsPage from './componnents/QuestionPage';
import HomePage from './componnents/HomePage';
import MedicineReminder from './componnents/MedicineRemainder';
import ContentCreation from './componnents/ContentCreation';
import Navbar from './componnents/NavBar'
import SpecailistsRequests from './componnents/SpecialistsRequests';

function App() {

  
  
  return (
    <>
  
    
      <Router>
         <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/firstAid" element={<FirstAid/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/" element={<FirstPage/>} />
          <Route path="/questionsPage/:categoryId" element={< QuestionsPage />} />
          <Route path="/homePage" element={<HomePage/>}/>
          <Route path="/medicineReminder/:userId" element={<MedicineReminder/>}/>
          <Route path='/contentCreation' element={<ContentCreation/>}/>
          <Route path="/specailistsRequests/:userId" element={<SpecailistsRequests/>}/>
        </Routes>
      </Router>

    </>
  );
}

export default App;