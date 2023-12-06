export const CURRENT_MEMBER_TIME_ENTRIES = 'currentMember';

/**
 * Write the the current member time sheet to cache (localStorage)
 *
 * @param timesheet
 */
export const writeTimeSheetEntryToCache = (timeEntries) => {
	const serialized = JSON.stringify(timeEntries);
	localStorage.setItem(CURRENT_MEMBER_TIME_ENTRIES, serialized);
};

export const readTimeSheetEntryFromCache = () => {
	const serialized = localStorage.getItem(CURRENT_MEMBER_TIME_ENTRIES);
	return JSON.parse(serialized);
};

export const clearCurrentMemberFromCache = () => {
	localStorage.removeItem(CURRENT_MEMBER_TIME_ENTRIES);
};

