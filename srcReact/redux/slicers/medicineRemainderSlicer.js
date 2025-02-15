import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNameMedication } from '../../API/API-nameMedicine';
import { getMedicationReminderById } from '../../API/API-medicationRemainder';
import { addMedicationReminder,updateMedicationReminder} from '../../API/API-medicationRemainder';
import { addScheduledEmailToReminder } from '../../API/API-medicationRemainder';
import { DeleteMedicationReminder } from '../../API/API-medicationRemainder';


export const nameMedicine=createAsyncThunk(
    'medicine/nameMedicine',
    async()=>{
        const respone=await getNameMedication();
        return respone
    }
)

export const allMedicationReminder=createAsyncThunk(
    'medicine/allMedicationReminder',
    async(id)=>{
        const respone=await getMedicationReminderById(id);
        console.log(respone);
        
        return respone
    }
)

export const addMyMedicationReminder=createAsyncThunk(
    'medicine/addMyMedicationReminder',
    async(medicationRemainder)=>{
        console.log(medicationRemainder);
        
        const respone=await addMedicationReminder(medicationRemainder);
        return respone
    }
)

export const deleteMyMedicationReminder=createAsyncThunk(
    'medicine/deleteMyMedicationReminder',
    async(id)=>{
        console.log(id);
        const respone=await DeleteMedicationReminder(id);
     
        
        return respone;
        
    }
)

export const updateMyMedicationReminder=createAsyncThunk(
    'medicine/updateMyMedicationReminder',
    async(update)=>{
    
        const respone=await updateMedicationReminder(update.id,update) ;
        return respone
    }
)

export const sendReminder=createAsyncThunk(
    'medicine/sendReminder',
    async(email)=>{
        console.log(email);
        const respone=await addScheduledEmailToReminder(email);
        console.log(respone);
        return respone
        
         
    }
)

const MedicineReminderSlice=createSlice({
  name:'medicine',
  initialState:{
    allMedicineReminder:[],
    allNameMedicine:[],
    status:'idle',
    error:null
  },
  reducers:{
     updateAllMedicineReminder:(state,action)=>{
      state.allMedicineReminder=action.payload
      },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(nameMedicine.pending,(state)=>{
        state.status='loading'
    })
    .addCase(nameMedicine.fulfilled, (state, action)=>{
        state.status='succeeded'
        state.allNameMedicine=action.payload
        console.log(state.allNameMedicine);
        
    })
    .addCase(nameMedicine.rejected, (state, action)=>{
        state.status='failed'
    })


    .addCase(allMedicationReminder.pending,(state)=>{
        state.status='loading'
    })
    .addCase(allMedicationReminder.fulfilled, (state, action)=>{
        state.status='succeeded'
        state.allMedicineReminder=action.payload
        console.log(state.allMedicineReminder);
        
    })
    .addCase(allMedicationReminder.rejected, (state, action)=>{
        state.status='failed'
    })
    .addCase(addMyMedicationReminder.pending,(state)=>{
        state.status='loading'
    })
    .addCase(addMyMedicationReminder.fulfilled, (state, action)=>{
        state.status='succeeded'
       
    })
    .addCase(addMyMedicationReminder.rejected, (state, action)=>{
        state.status='failed'
    })

    .addCase(deleteMyMedicationReminder.pending,(state)=>{
        state.status='loading'
    })
    .addCase(deleteMyMedicationReminder.fulfilled, (state, action)=>{
        state.status='succeeded'
        console.log(action.payload);
        
        state.allMedicineReminder=action.payload
    
        
    })
    .addCase(deleteMyMedicationReminder.rejected, (state, action)=>{
        state.status='failed'
    })
    .addCase(updateMyMedicationReminder.pending,(state)=>{
        state.status='loading'
    })
    .addCase(updateMyMedicationReminder.fulfilled, (state, action)=>{
        state.status='succeeded'
        console.log(action.payload);
       
    })
    .addCase(updateMyMedicationReminder.rejected, (state, action)=>{
        state.status='failed'
    });

  },

 })
 export const { updateAllMedicineReminder } = MedicineReminderSlice.actions;
 export default MedicineReminderSlice.reducer;