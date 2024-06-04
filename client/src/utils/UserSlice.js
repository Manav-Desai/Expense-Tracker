import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice({

    name : "user",
    initialState : {
        userdetails : {
            _id : null
        }
    },
    reducers : {
        addUser : (state,action) => {
            state.userdetails = {...state.userdetails, ...action.payload}
        },
        removeUser : (state,action) => {
            state.userdetails = {...state.userdetails, ...action.payload}
        }
    }
});

export const {addUser , removeUser} = UserSlice.actions;

export default UserSlice.reducer;