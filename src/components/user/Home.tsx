import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../utils/type';
import useCurrentWeek from '../../hooks/useCurrentWeek';

const Home = () => {
  const { timeSheetEntries } = useSelector((state: RootState) => state.timesheet);
  const navigate = useNavigate();
  const { minDate, maxDate, selectedDate, setSelectedDate } = useCurrentWeek();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleDateClick = () => {
    navigate(`/add-timesheet/${selectedDate}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Time Sheets for all dates</h2>
      <div className="md:flex md:items-center md:space-x-4 mb-4">
        <input
          className="p-4 bg-gray-100"
          type="date"
          placeholder="Date"
          onChange={handleDateChange}
          value={selectedDate}
          min={minDate}
          max={maxDate}
        />
        <button
          className="m-2 p-4 bg-black text-white rounded"
          onClick={handleDateClick}
        >
          Add Tasks
        </button>
      </div>
      {timeSheetEntries
         ?.slice()
         .sort((a, b) => new Date(a.date) - new Date(b.date))
         .map((entry, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{new Date(entry.date).toDateString()}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Customer</th>
                    <th className="border border-gray-300 p-2">Project</th>
                    <th className="border border-gray-300 p-2">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.timeEntries?.map((timeEntry, timeIndex) => (
                    <tr key={timeIndex}>
                      <td className="border border-gray-300 p-2">{timeEntry.description}</td>
                      <td className="border border-gray-300 p-2">{timeEntry.customer}</td>
                      <td className="border border-gray-300 p-2">{timeEntry.project}</td>
                      <td className="border border-gray-300 p-2">{timeEntry.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      ))}
    </div>
  );
}

export default Home;
