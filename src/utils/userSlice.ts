import { createSlice } from "@reduxjs/toolkit";
import { clearTimeSheetEntryFromCache } from "./storage/task-entries";

const userSlice = createSlice({
    name: 'user',
    initialState: null, 
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        }, 
        removeUser: () => {
            clearTimeSheetEntryFromCache();
            return null;
        }, 
    }
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;