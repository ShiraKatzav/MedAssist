
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendEmail } from '../../API/API-email';
import { addSpecialistRequest, getRequestByUserId, deleteSpecialistRequest } from '../../API/API-specailistsRequests';

export const sendMail = createAsyncThunk(
  'specialistRequest/sendEmail',
  async (email) => {
    const response = await sendEmail(email);
    console.log(response);
    return response;
  }
);

export const addRequest = createAsyncThunk(
  'specialistRequest/addRequest',
  async (request) => {
    const response = await addSpecialistRequest(request);
    console.log(response);
    return response;
  }
);

export const listOfSpecialistRequest = createAsyncThunk(
  'specialistRequest/listOfSpecialistRequest',
  async (id) => {
    const response = await getRequestByUserId(id);
    console.log(response);
    return response;
  }
);

export const deleteRequest = createAsyncThunk(
  'specialistRequest/deleteSpecialistRequest',
  async (id) => {
    const response = await deleteSpecialistRequest(id);
    console.log(response);
    return id; 
  }
);


const specialistRequestSlice = createSlice({
  name: 'specialistRequest',
  initialState: {
    allSpecialistRequests: [],
    selectedInjury: null,
    status: 'idle',
    statusRequests: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
     
        state.allSpecialistRequests.push(action.payload);
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(sendMail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(listOfSpecialistRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listOfSpecialistRequest.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.status = 'succeeded';
        state.allSpecialistRequests = action.payload;
        console.log(state.allSpecialistRequests);
      })
      .addCase(listOfSpecialistRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allSpecialistRequests = state.allSpecialistRequests.filter(
          (request) => request.id !== action.payload
        );
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default specialistRequestSlice.reducer;