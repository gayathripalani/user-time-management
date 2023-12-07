import { TimeEntry } from "./type";

export const getTotalHoursFilled = (timeEntries: TimeEntry[]) => {
  if (!timeEntries || timeEntries.length === 0) {
    return 0;
  }

  const totalHours = timeEntries.reduce((sum, entry) => {
    const hours = parseFloat(entry.hours) || 0;
    return sum + hours;
  }, 0);
  console.log(totalHours);
  return totalHours;
};
