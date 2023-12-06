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
    hours: number;
    comment?: string | null;
}

export interface TimeSheetEntry {
    uid: number;
    date: Date;
    timeEntries: TimeEntry[];
}