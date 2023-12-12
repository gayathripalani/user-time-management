import { FC, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../utils/timesheetEntrySlice';
import { TimeSheetEntry, TimeEntry, RootState } from '../../utils/type';
import { useNavigate, useParams } from 'react-router-dom';
import { getTotalHoursFilled } from '../../utils/helper';
import Alert from '../common/Alert';
import AddTimeSheet from './AddTimeSheet';

const TimeEntryForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskDate } = useParams();
  const [totalHoursMessage, setTotalHoursMessage] = useState<string | null>(null);
  const { timeSheetEntries } = useSelector((state: RootState) => state.timesheet);
  const defaultTimeEntry: TimeEntry = {
    description: '',
    customer: 'Posten Norge AS',
    project: 'Tracking',
    hours: '2',
    date: new Date(taskDate || ''),
  };
  const defaultEntry = {
    uid: 1,
    date: new Date(taskDate || ''),
    timeEntries: [defaultTimeEntry],
  };

  const filteredEntry: TimeSheetEntry | null =
    timeSheetEntries?.find((entry) => {
      const taskDateValue = new Date(taskDate || '');
      const entryDate = new Date(entry.date);

      return entryDate.getTime() === taskDateValue.getTime();
    }) || defaultEntry;

  const formMethods = useForm<TimeSheetEntry>({ defaultValues: filteredEntry });

  const { control, handleSubmit, register, formState: { errors, isValid } } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'timeEntries',
  });

  const onSubmit: SubmitHandler<TimeSheetEntry> = async (data) => {
    const totalHours = getTotalHoursFilled(data.timeEntries);
    if (totalHours === 8) {
      try {
        dispatch(addEntry(data));
        navigate('/home');
      } catch (error) {
        console.error(error);
      }
    } else {
      setTotalHoursMessage('Total hours must be 8');
      setTimeout(() => {
        setTotalHoursMessage('');
      }, 3000);
    }
  };

  const handleAddTaskClick = () => {
    append(defaultTimeEntry);
  };

  return (
    <div className="container p-4 mx-auto">
      {totalHoursMessage && <Alert message={totalHoursMessage} />}
      <FormProvider {...formMethods}>
        <div>
          <form className="mt-20 px-4 md:px-10 lg:px-20 xl:px-32 overflow-x-auto" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((entry, index) => (
              <div key={entry.id} className="flex flex-col md:flex-row justify-between md:items-center px-2 mb-4">
                <div className="flex flex-col mb-4 md:mb-0">
                  <label htmlFor={`timeEntries[${index}].date`} className="text-sm font-semibold mb-1">
                    Date
                  </label>
                  <input
                    className="p-4 bg-gray-100"
                    type="date"
                    placeholder="Date"
                    value={taskDate}
                    disabled
                  />
                </div>

                <div className="flex flex-col mb-4 md:mb-0 md:ml-4">
                  <label htmlFor={`timeEntries[${index}].description`} className="text-sm font-semibold mb-1">
                    Description
                  </label>
                  <input
                    className="p-4 bg-gray-100"
                    type="text"
                    placeholder="Enter description"
                    {...register(`timeEntries.${index}.description`, { required: true })}
                    defaultValue={entry.description}
                  />
                </div>

                <AddTimeSheet entry={entry} index={index} />

                <div className="flex flex-col mb-4 md:mb-0 md:mx-4">
                  <label htmlFor={`timeEntries[${index}].hours`} className="text-sm font-semibold mb-1">
                    Hours
                  </label>
                  <input
                    className="p-4 bg-gray-100"
                    type="number"
                    placeholder="hours"
                    {...register(`timeEntries.${index}.hours`, { required: 'Fill the hours' })}
                    defaultValue={entry.hours}
                  />
                </div>

                <button
                  type="button"
                  className="p-2 mt-4 rounded-lg bg-transparent py-2 px-4 border border-red-500"
                  onClick={() => remove(index)}
                >
                  Remove Task
                </button>
              </div>
            ))}

            <button className="p-2 my-4 bg-black rounded-lg text-white" type="button" onClick={handleAddTaskClick}>
              Add task
            </button>

            <div className="flex justify-center">
              <button className={`py-2 px-4 my-4 bg-black rounded-lg text-white`} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default TimeEntryForm;
