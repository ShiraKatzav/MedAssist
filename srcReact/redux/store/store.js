import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slicers/loginSlicer'
import signUpUserReducer from '../slicers/signUp'
import injuriesReducer from '../slicers/injuriesAndSpecializaitionSlicer'
import categoriesReducer from '../slicers/categoriesSlicer'
import questionsReducer from '../slicers/quetionsSlicer'
import contenCreationReducer from '../slicers/contentCreationSlicer'
import { persistStore, persistReducer } from 'redux-persist';
import medicineReminderReducer from '../slicers/medicineRemainderSlicer'
import specailistsRequests from '../slicers/specialistRequestsSlicer'
import storage from 'redux-persist/lib/storage'; 


const persistConfig = {
    key: 'root', 
    storage,

  };

  const questionPersistedReducer = persistReducer(persistConfig, questionsReducer); 
 

 const store = configureStore({
    reducer: {
        user: loginReducer,
        signUpUser: signUpUserReducer,
        injuries: injuriesReducer, 
        categories:categoriesReducer,
        questions:questionPersistedReducer,
        contentCreation:contenCreationReducer,
        medicine:medicineReminderReducer,
        specialistRequest:specailistsRequests,
    },
})

const persistor = persistStore(store);
export {store,persistor};