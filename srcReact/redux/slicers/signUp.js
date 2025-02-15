import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUpUser } from '../../API/API-users';

export const signUp = createAsyncThunk(
    'signUp/signUpUser',
    async (user, { rejectWithValue }) => {
      try {
        const response = await signUpUser(user); 
        if (response.status === 201) {
          return response.data; 
        } else {
          return rejectWithValue(response);
        }
      } catch (error) {
        return rejectWithValue(error.response || error.message);
      }
    }
  );
const initialState={ 
    user: null,
    status: 'idle', 
    error: null,}

const signUpUserSlice=createSlice({
    name:'signUpUser',
    initialState,
    reducers:{
        setSignUpUser:(state,action)=>{
            state.user=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(signUp.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(signUp.fulfilled, (state, action) => {
            state.status = 'succeeded'; 
            state.user = action.payload; 
          })
          .addCase(signUp.rejected, (state, action) => {
            state.status = 'failed'; 
            state.error = action.payload; 
          });
      },
});
export const {setSignUpUser}=signUpUserSlice.actions
export default signUpUserSlice.reducer;