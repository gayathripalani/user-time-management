import { createSlice } from "@reduxjs/toolkit";

const timesheetEntry = createSlice({
    name: 'timesheetEntry',
    initialState: {
        timeSheetEntry: null,
    }, 
    reducers: {
        addEntry: (state, action) => {
            state.timeSheetEntry =  action.payload;
        }, 
    }
});
export const { addEntry } = timesheetEntry.actions;
export default timesheetEntry.reducer;