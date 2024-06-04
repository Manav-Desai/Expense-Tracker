import {createSlice} from "@reduxjs/toolkit";

const DataSlice = createSlice({

    name : "data",
    initialState : {

        details : {
            saving : 0,
            expense : 0,
            investment : 0
        }
    },
    reducers : {
        addData : (state , action) => {
            state.details = action.payload;
        }
    }
});

export const {addData} = DataSlice.actions;
export default DataSlice.reducer;