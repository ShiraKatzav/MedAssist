import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContentCreations } from "../../API/API-contentCreation";
import { addContentCreation,addPost } from '../../API/API-contentCreation';
export const fetchContentCreation=createAsyncThunk(
  'contentCreation/fetchContentCreation',
   async()=>{
    const respone=await getContentCreations();
    return respone;
   }
);

export const addContent=createAsyncThunk(
    'contentCreation/addContent',
async(formData)=>{
        console.log(formData);
        const respone=await addContentCreation(formData);
        console.log(respone);
        return respone
    }
);
export const addNewPost=createAsyncThunk(
    'contentCreation/addPosts',
async(contentCreation)=>{
        console.log(contentCreation);
        const respone=await addPost(contentCreation);
        console.log(respone);
        return respone
    }
);
const contentCreationSlice=createSlice({
    name:'contentCreation',
    initialState: {
      allContentCreation: [], 
      selectedCategory: null, 
      status: 'idle',  
      statusAdd:'idle',
      error: null,
      },
    reducers:{
        updateAllContentCreation:(state,action)=>{
          state.allContentCreation=action.payload
        },
    },
    extraReducers:(builder)=>{
        builder        
        .addCase(fetchContentCreation.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchContentCreation.fulfilled,(state,action)=>{
            state.status='succeeded';
            console.log(action.payload);
            state.allContentCreation=action.payload
        })
        .addCase(fetchContentCreation.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })

        .addCase(addContent.pending,(state)=>{
            state.statusAdd='loading';
        })
        .addCase(addContent.fulfilled,(state,action)=>{
            state.statusAdd='succeeded';
            console.log(action.payload);
         
        })
        .addCase(addContent.rejected,(state,action)=>{
            state.statusAdd='failed';
            state.error=action.error.message;
        })
        .addCase(addNewPost.pending,(state)=>{
            state.statusAdd='loading';
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            state.statusAdd='succeeded';
            console.log(action.payload);
         
        })
        .addCase(addNewPost.rejected,(state,action)=>{
            state.statusAdd='failed';
            state.error=action.error.message;
        });
        
    },
});
export const {updateAllContentCreation}=contentCreationSlice.actions;
export default contentCreationSlice.reducer;