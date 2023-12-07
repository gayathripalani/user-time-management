import React, { FC, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, addNoOfTasks } from '../../utils/timesheetEntrySlice';
import AddTimeSheet from './AddTimeSheet';
import { TimeSheetEntry, TimeEntry, RootState } from '../../utils/type';
import { useNavigate, useParams } from 'react-router-dom';
import { getTotalHoursFilled } from '../../utils/helper';
import Alert from '../common/Alert';
import customerData from '../../utils/customer.json';

const TimeEntryForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskDate } = useParams();
  const [projects, setProjects] = useState<string[]>(['Reports', 'Tracking', 'Booking', 'Private Marketing']);
  const [totalHoursMessage, setTotalHoursMessage] = useState<string | null>(null);
  const { timeSheetEntries } = useSelector((state: RootState) => state.timesheet);
  const defaultTimeEntry: TimeEntry = {
    description: '',
    customer: '',
    project: '',
    hours: 2,
    date : new Date(taskDate || '')
  }
  const defaultEntry =  
    {
    uid:1,
    date: new Date(taskDate || ''),
    timeEntries: [defaultTimeEntry]
  };
  const filteredEntry: TimeSheetEntry  = timeSheetEntries?.find(entry => entry.date === new Date(taskDate || '')) || defaultEntry;
  const formMethods = useForm<TimeSheetEntry>({defaultValues:filteredEntry});  

  const { control, handleSubmit, setValue, getValues, clearErrors, register, formState: { errors, isValid }, } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'timeEntries',
  });

  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer = customerData?.customers.find(
      (customer) => customer.name === event.target.value
    );
    const defaultProjects = selectedCustomer?.projects.map((project) => project.name) || [];
    setProjects(defaultProjects);
  };

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
      setTimeout(() => {
        setTotalHoursMessage('');
      }, 3000);
    }
  };

  const handleAddTaskClick = () => {
    dispatch(addNoOfTasks(fields.length + 1));
    append(defaultTimeEntry);
  };

  return (
    <div className="container p-4 mx-auto">
      {totalHoursMessage && <Alert message={totalHoursMessage} />}
      <FormProvider {...formMethods}>
        <div>
          <form className="mt-20 px-10" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((entry, index) => (
              <div key={entry.id} className="flex flex-row justify-between px-2 mb-4">
                <div className="flex flex-col">
                  <label htmlFor={`timeEntries[${index}].date`} className="text-sm font-semibold mb-1">
                    Date
                  </label>
                  <input
                    className="p-4 bg-gray-100 mb-4"
                    type="date"
                    placeholder="Date"
                    {...register(`timeEntries.${index}.date`, { required: true })}
                    value={taskDate}
                    disabled
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`timeEntries[${index}].description`} className="text-sm font-semibold mb-1">
                    Description
                  </label>
                  <input
                    className="p-4 bg-gray-100 mb-4"
                    type="text"
                    placeholder="Enter description"
                    {...register(`timeEntries.${index}.description`, { required: true })}
                    defaultValue={entry.description} />
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`timeEntries.${index}.customer`} className="text-sm font-semibold mb-1">
                    customer
                  </label>
                  <select
                    className="p-4 mb-4 bg-gray-100"
                    {...register(`timeEntries.${index}.customer`)}
                    onChange={handleCustomerChange}
                  >
                    {customerData?.customers.map((customer, index) => (
                      <option key={index} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`timeEntries.${index}.project`} className="text-sm font-semibold mb-1">
                    project
                  </label>
                  <select
                    className="p-4 mb-4 bg-gray-100"
                    {...register(`timeEntries.${index}.project`)}
                  >
                    {projects.map((project, index) => (
                      <option key={index} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor={`timeEntries[${index}].hours`} className="text-sm font-semibold mb-1">
                      Hours
                    </label>
                      <input
                      className="p-4 bg-gray-100 mb-4"
                      type="text"
                      placeholder="hours"
                      {...register(`timeEntries.${index}.hours`, { 
                        required: 'Fill the hours',
                        pattern: {
                          value: /^[0-9]$/,
                          message: 'Please enter a valid hours',
                        },})}
                      defaultValue={entry.hours}
                      
                  />
                </div>

                <button type="button" className="p-2 my-4 rounded-lg bg-transparent py-2 px-4 border border-red-500" onClick={() => remove(index)}>
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
