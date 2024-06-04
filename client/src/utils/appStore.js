import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import TransactionSlice from "./TransactionSlice";
import DataSlice from "./DataSlice";

const appStore = configureStore({
    
    reducer : {
        user : UserSlice,
        transaction : TransactionSlice,
        data : DataSlice,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    }),
});

export default appStore;