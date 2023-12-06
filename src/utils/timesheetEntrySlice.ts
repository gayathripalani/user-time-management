import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeSheetEntry, TimeEntry } from './type';
import { writeTimeSheetEntryToCache } from '../utils/storage/task-entries';

interface TimeSheetEntryState {
  timeSheetEntries: TimeSheetEntry[];
  taskCount: number;
}

const initialState: TimeSheetEntryState = {
  timeSheetEntries: [],
  taskCount: 0,
};

const timesheetEntrySlice = createSlice({
  name: 'timeSheetEntry',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<TimeSheetEntry>) => {
      // Assuming that the payload is an array of TimeEntry
      const { date, timeEntries} = action.payload;
      state.timeSheetEntries = [
        ...state.timeSheetEntries,
        {
          uid: state.taskCount + 1,
          date: date, // You may want to get the date from your payload if it's available
          timeEntries: timeEntries
        },
      ];
      state.taskCount += 1;
      writeTimeSheetEntryToCache(state.timeSheetEntries);
    },
    addNoOfTasks: (state, action: PayloadAction<number>) => {
      state.taskCount = action.payload;
    },
  },
});

export const { addEntry, addNoOfTasks } = timesheetEntrySlice.actions;
export default timesheetEntrySlice.reducer;
