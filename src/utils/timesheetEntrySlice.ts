// timeSheetEntrySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeSheetEntry, TimeEntry } from './type';

interface TimeSheetEntryState {
  timeSheetEntries: TimeSheetEntry[];
  taskCount: number;
}

const initialState: TimeSheetEntryState = {
  timeSheetEntries: [],
  taskCount: 0,
};

const timeSheetEntrySlice = createSlice({
  name: 'timeSheetEntry',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<TimeEntry[]>) => {
      state.timeSheetEntries = [...state.timeSheetEntries, { uid: state.taskCount + 1, date: new Date(), timeEntries: action.payload }];
      state.taskCount += 1;
    },
    setTaskCount: (state, action: PayloadAction<number>) => {
      state.taskCount = action.payload;
    },
  },
});

export const { addEntry, setTaskCount } = timeSheetEntrySlice.actions;
export default timeSheetEntrySlice.reducer;
