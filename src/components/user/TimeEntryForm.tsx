import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEntry, addNoOfTasks } from '../../utils/timesheetEntrySlice';
import AddTimeSheet from './AddTimeSheet';
import { TimeSheetEntry, TimeEntry, RootState } from '../../utils/type';
import { useNavigate, useParams } from 'react-router-dom';
import { getTotalHoursFilled } from '../../utils/helper';
import Alert from '../common/Alert';

const TimeEntryForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskCount, setTaskCountLocal] = useState(0);
  const [totalHoursMessage, setTotalHoursMessage] = useState<string | null>(null);
  const { taskDate } = useParams();

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    clearErrors
  } = useForm<TimeSheetEntry>({
    defaultValues: {
      uid: 1,
      date: taskDate,
      timeEntries: [
        {
          date: taskDate,
        },
      ],
    },
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
        setTotalHoursMessage('Total hours must be greater than 8');
        setValue('totalHours', { type: 'manual', message: 'Total hours must be greater than 8' });
        setTimeout(() => {
          clearErrors('totalHours');
          setTotalHoursMessage('');
        }, 3000);
    }
  };

  const handleInputChange = (field: keyof TimeEntry, index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(`timeEntries[${index}].${field}`, e.target.value);
    trigger(`timeEntries[${index}].${field}`)
  };

  const handleAddTaskClick = () => {
    const currentEntries = getValues().timeEntries || [];
    dispatch(addNoOfTasks(taskCount + 1));
    setTaskCountLocal(taskCount + 1);
    setValue('timeEntries', [...currentEntries, {}]);
  };

  return (
    <div>{totalHoursMessage && <Alert message={totalHoursMessage} />}
      <form className="mt-20 px-10" onSubmit={handleSubmit(onSubmit)}>
        {getValues()?.timeEntries.map((entry, index) => (
          <div key={index} className="flex flex-row justify-between px-2 mb-4">
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-semibold mb-1">
                Date
              </label>
              <input
                className="p-4 bg-gray-100 mb-4"
                type="date"
                placeholder="Date"
                {...register(`timeEntries[${index}].date`, { required: true })}
                value={taskDate}
                disabled
              />
            </div>
            <AddTimeSheet
              register={(name, options) => register(`timeEntries[${index}].${name}`, options)}
              handleInputChange={(field) => handleInputChange(field as keyof TimeEntry, index)}
              errors={errors?.timeEntries && errors.timeEntries[index]}
            />
          </div>
        ))}

        <button
          className="p-2 my-4 bg-black rounded-lg text-white"
          onClick={handleAddTaskClick}
          type="button"
        >
          Add task
        </button>

        <div className="flex justify-center">
          <button
            className={`py-2 px-4 my-4 bg-black rounded-lg text-white`}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeEntryForm;


