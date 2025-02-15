import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isExist } from '../../API/API-users';


export const checkUserExistence = createAsyncThunk(
  'user/checkUserExistence', 
  async (user,{rejectWithValue}) => {
   
    
     try {
        const response = await isExist(user); 
        
        if (response.status !== 200) {
            return rejectWithValue({
                status: response.status,
                message: response.statusText,
              });
        }
        
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } 
);

const loginSlice = createSlice({
  name: 'user',
  initialState: {
    myUser: null,
    status: 'idle',  
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.myUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserExistence.pending, (state) => {
        state.status = 'loading';  
      })
      .addCase(checkUserExistence.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.myUser = action.payload; 
      })
      .addCase(checkUserExistence.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;
      });
  },
});
export const {setUser}=loginSlice.actions;
export default loginSlice.reducer;