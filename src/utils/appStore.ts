import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from './userSlice'
import  timesheetReducer  from './timesheetEntrySlice'
import { readTimeSheetEntryFromCache } from "./storage/task-entries";

const preloadedState = {
  timesheet: {
    timeSheetEntries: readTimeSheetEntryFromCache(),
    taskCount: 0,
  },
};

const appStore = configureStore({
  reducer: {
    user: userReducer,
    timesheet: timesheetReducer
  },
  preloadedState,
});

export default appStore;
