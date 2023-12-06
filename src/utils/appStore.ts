import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from './userSlice'
import  timesheetReducer  from './timesheetEntrySlice'

const appStore = configureStore({
    reducer : {
        user: userReducer,
        timesheet: timesheetReducer
    }
})
export default appStore;