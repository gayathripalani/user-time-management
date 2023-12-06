// TimeEntryForm.tsx
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEntry, setTaskCount } from '../../utils/timeSheetEntrySlice';
import AddTimeSheet from './AddTimeSheet';
import { TimeSheetEntry, TimeEntry } from '../../utils/type';

type FormValues = {
  timeEntries: TimeEntry[];
};

const TimeEntryForm: FC = () => {
  const dispatch = useDispatch();
  const [taskCount, setTaskCountLocal] = useState(0);
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      timeEntries: [
        {
          description: 'Tracking',
          customer: 'Posten Norge AS',
          project: 'Tracking',
          hours: '4',
          comment: 'Worked on Tracking',
          date: '2023-12-07',
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      dispatch(addEntry(data.timeEntries));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`timeEntries[${index}].date`, e.target.value, { shouldValidate: true });
  };

  const handleInputChange = (field: keyof TimeEntry, index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(`timeEntries[${index}].${field}`, e.target.value);
  };

  const handleAddTaskClick = () => {
    const currentEntries = getValues().timeEntries || [];
    dispatch(setTaskCount(taskCount + 1)); // Corrected
    setTaskCountLocal(taskCount + 1);
    setValue('timeEntries', [...currentEntries, {}]);
  };

  return (
    <form className="mt-20 px-10" onSubmit={handleSubmit(onSubmit)}>
      {getValues().timeEntries.map((entry, index) => (
        <div key={index} className="flex flex-row justify-between mb-4">
          <input
            className="p-4 bg-gray-100"
            type="date"
            placeholder="Date"
            {...register(`timeEntries[${index}].date`, { required: true })}
            onChange={handleDateChange(index)}
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

      <button
        className="p-2 my-4 bg-black rounded-lg text-white"
        type="submit"
        disabled={!isValid}
      >
        Save
      </button>
    </form>
  );
};

export default TimeEntryForm;
