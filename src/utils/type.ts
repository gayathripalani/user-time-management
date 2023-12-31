export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string | null;
}
export interface TimeEntry {
    description: string;
    customer: string;
    project: string;
    date: Date;
    hours: string;
    comment?: string | null;
}

export interface TimeSheetEntry {
    date: Date;
    timeEntries: TimeEntry[];
}

export interface RootState {
    timesheet: {
        timeSheetEntries: TimeSheetEntry[];
    };
}
