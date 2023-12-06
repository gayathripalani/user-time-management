import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEntry, setTaskCount } from '../../utils/timesheetEntrySlice';
import AddTimeSheet from './AddTimeSheet';
import { TimeSheetEntry, TimeEntry, RootState } from '../../utils/type';
import { useNavigate, useParams } from 'react-router-dom';

const TimeEntryForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskCount, setTaskCountLocal] = useState(0);
  const {taskDate} = useParams();

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<TimeSheetEntry>({
    defaultValues: {
      uid: 1,
      date: taskDate,
      timeEntries: [
        {
          description: 'Tracking',
          customer: 'Posten Norge AS',
          project: 'Tracking',
          hours: '4',
          comment: 'Worked on Tracking',
          date: taskDate,
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<TimeSheetEntry> = async (data) => {
    console.log(data);
    try {
      dispatch(addEntry(data));
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };


  const handleInputChange = (field: keyof TimeEntry, index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(`timeEntries[${index}].${field}`, e.target.value);
  };

  const handleAddTaskClick = () => {
    const currentEntries = getValues().timeEntries || [];
    dispatch(setTaskCount(taskCount + 1));
    setTaskCountLocal(taskCount + 1);
    setValue('timeEntries', [...currentEntries, {}]);
  };

  return (
    <form className="mt-20 px-10" onSubmit={handleSubmit(onSubmit)}>
      {getValues()?.timeEntries.map((entry, index) => (
        <div key={index} className="flex flex-row justify-between mb-4">
           <input
            className="p-4 bg-gray-100 mb-4"
            type="date"
            placeholder="Date"
            {...register('date', { required: true })}
            value={taskDate}
            disabled
          />
          <AddTimeSheet
            register={(name, options) => register(`timeEntries[${index}].${name}`, options)}
            handleInputChange={(field) => handleInputChange(field as keyof TimeEntry, index)}
            index={index}
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
          className="py-2 px-4 my-4 bg-black rounded-lg text-white"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TimeEntryForm;
