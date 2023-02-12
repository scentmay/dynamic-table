import { configureStore } from "@reduxjs/toolkit";

// reducers
import tableReducer from '../reducers/tableSlice.js';

export default configureStore({
    reducer: {
        table: tableReducer,
    }
})

