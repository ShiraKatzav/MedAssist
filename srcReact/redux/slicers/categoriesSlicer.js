import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../API/API-category';  


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',  
  async () => {
    const response = await getCategories();  
    console.log(response)
    
    return response;  
  }
);


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    allCategories: [],  
    selectedCategory: null, 
    status: 'idle',  
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
        console.log(action.payload); 
        state.selectedCategory = action.payload;
        console.log(state.selectedCategory);
        localStorage.setItem('selectedCategory',JSON.stringify(state.selectedCategory))  
        console.log(state.selectedCategory); 
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';  
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';  
        state.allCategories = action.payload; 
        console.log(state.allCategories) 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.error.message;  
      });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;