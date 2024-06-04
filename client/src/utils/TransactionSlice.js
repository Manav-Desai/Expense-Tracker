import {createSlice} from "@reduxjs/toolkit";

const TransactionSlice = createSlice({

    name : "transaction",
    initialState : {
        items : []
    },
    reducers : {
        addItems : (state , action) => {
            state.items = action.payload;
        }
    }
});

export const {addItems} = TransactionSlice.actions;

export default TransactionSlice.reducer;