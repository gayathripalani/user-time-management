export const getTotalHoursFilled = (timeEntries) => {
    if (!timeEntries || timeEntries.length === 0) {
      return 0; // Return 0 if no timeEntries or an empty array
    }
  
    const totalHours = timeEntries.reduce((sum, entry) => {
      const hours = parseFloat(entry.hours) || 0;
      return sum + hours;
    }, 0);
  
    return totalHours;
  };
  