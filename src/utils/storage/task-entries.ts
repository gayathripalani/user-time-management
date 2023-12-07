import { TimeSheetEntry } from "../type";
export const CURRENT_MEMBER_TIME_ENTRIES = 'currentMember';

export const writeTimeSheetEntryToCache = (timeEntries: TimeSheetEntry[]) => {
	const serialized = JSON.stringify(timeEntries);
	localStorage.setItem(CURRENT_MEMBER_TIME_ENTRIES, serialized);
};

export const readTimeSheetEntryFromCache = () => {
	const serialized = localStorage.getItem(CURRENT_MEMBER_TIME_ENTRIES) || '[]';
	return JSON.parse(serialized);
};

export const clearCurrentMemberFromCache = () => {
	localStorage.removeItem(CURRENT_MEMBER_TIME_ENTRIES);
};
