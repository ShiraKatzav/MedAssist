import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInjuries } from '../../API/API-injuries';  
import { usersCanHelp } from '../../API/API-injuries';
import { getAllSpecializations} from '../../API/API-specialization';




export const fetchInjuries = createAsyncThunk(
  'injuries/fetchInjuries', 
  async () => {
    const response = await getInjuries();  
    console.log(response)
    return response;  
  }
);

export const usersCanHelpMe=createAsyncThunk(
  'injuries/usersCanHelpMe',
  async(injuryDTO)=>{
    console.log(injuryDTO);
    
    const response=await usersCanHelp(injuryDTO);
    console.log(response);
    return response;
  }
)

export const getAllSpecialization=createAsyncThunk(
  'injuries/allSpecialization',
  async()=>{
    const response= await getAllSpecializations();
    console.log(response);
    
    return response
  }
)



const injuriesSlice = createSlice({
  name: 'injuries',
  initialState: {
    allInjuries: [],  
    allSpecialization: [],
    allSpecialistRequests:[],
    selectedInjury: null, 
    status: 'idle', 
    statusRequests:'idle', 
    error: null,
  },
  reducers: {
    setSelectedInjury: (state, action) => {
        console.log(action.payload); 
        state.selectedInjury = action.payload;  
        console.log(state.selectedInjury); 
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInjuries.pending, (state) => {
        state.status = 'loading';  
      })
      .addCase(fetchInjuries.fulfilled, (state, action) => {
        state.status = 'succeeded';  
        state.allInjuries = action.payload; 
        console.log(state.allInjuries) 
      })
      .addCase(fetchInjuries.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(getAllSpecialization.pending, (state) => {
        state.status = 'loading';  
      })
      .addCase(getAllSpecialization.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.allSpecialization = action.payload; 
        console.log(state.allSpecialization) 
      })
      .addCase(getAllSpecialization.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.error.message;  
      })

  },
});

export const { setSelectedInjury } = injuriesSlice.actions;
export default injuriesSlice.reducer;