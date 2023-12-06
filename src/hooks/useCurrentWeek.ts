import { useEffect, useState } from 'react';

const useCurrentWeek = () => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6);

    const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
    const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

    setMinDate(formattedStartOfWeek);
    setMaxDate(formattedEndOfWeek);
    setSelectedDate(formattedStartOfWeek);
  }, []);

  return { minDate, maxDate, selectedDate, setSelectedDate };
};

export default useCurrentWeek;