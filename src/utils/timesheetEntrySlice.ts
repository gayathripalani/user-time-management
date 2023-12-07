import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeSheetEntry } from './type';
import { writeTimeSheetEntryToCache } from '../utils/storage/task-entries';

interface TimeSheetEntryState {
  timeSheetEntries: TimeSheetEntry[];
}

const initialState: TimeSheetEntryState = {
  timeSheetEntries: [],
};

const timesheetEntrySlice = createSlice({
  name: 'timeSheetEntry',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<TimeSheetEntry>) => {
      const { date, timeEntries } = action.payload;
      const existingEntryIndex = state.timeSheetEntries.findIndex(entry => {
        return new Date(entry.date).getTime() === new Date(date).getTime();
      });
    
      if (existingEntryIndex !== -1) {
        const updatedEntry = {
          ...state.timeSheetEntries[existingEntryIndex],
          timeEntries
        };
        state.timeSheetEntries = [
          ...state.timeSheetEntries.slice(0, existingEntryIndex),
          updatedEntry,
          ...state.timeSheetEntries.slice(existingEntryIndex + 1)
        ];
      } else {
        state.timeSheetEntries.push({ date, timeEntries });
      }
    
      writeTimeSheetEntryToCache(state.timeSheetEntries);
    }   
  },
});

export const { addEntry } = timesheetEntrySlice.actions;
export default timesheetEntrySlice.reducer;
