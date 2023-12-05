import { FC, useState } from 'react';
import customerData from '../../utils/customer.json';
import { useForm } from 'react-hook-form';
import { addEntry } from '../../utils/timeSheetEntrySlice';
import { useDispatch } from 'react-redux';

type FormValues = {
  description: string;
  customer: string;
  project: string;
  date: string;
  hours: string;
  comment: string;
};

const TimeEntryForm: FC = () => {
  const dispatch = useDispatch();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
  } = useForm<FormValues>();

  const [projects, setProjects] = useState<string[]>([]);

  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer = customerData?.customers.find(
      (customer) => customer.name === event.target.value
    );
    setProjects(selectedCustomer?.projects.map((project) => project.name) || []);
  };

  const onSubmit = async (data) => {
    try {
      dispatch(addEntry(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('date', e.target.value, { shouldValidate: true });
  };

  const handleInputChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value);
  };

  return (
    <form className="mt-20 px-10 flex flex-row justify-between" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="p-4 my-2 bg-gray-100"
        placeholder="Description"
        type="text"
        {...register('description')}
        onChange={handleInputChange('description')}
      />
      <select className="p-4 my-2 bg-gray-100" {...register('customer')} onChange={handleCustomerChange}>
        {customerData?.customers.map((customer, index) => (
          <option key={index} value={customer.name}>
            {customer.name}
          </option>
        ))}
      </select>
      <select className="p-4 my-2 bg-gray-100" {...register('project')}>
        {projects.map((project, index) => (
          <option key={index} value={project}>
            {project}
          </option>
        ))}
      </select>
      <input
        className="p-4 my-2 bg-gray-100"
        type="date"
        placeholder="Date"
        {...register('date')}
        onChange={handleDateChange}
      />
      <input
        className="p-4 my-2 bg-gray-100"
        type="text"
        placeholder="Hours"
        {...register('hours')}
        onChange={handleInputChange('hours')}
      />
      <input
        className="p-4 my-2 bg-gray-100"
        type="text"
        placeholder="Comment"
        {...register('comment')}
        onChange={handleInputChange('comment')}
      />
      <button className="p-2 my-4 bg-black rounded-lg text-white" type="submit" disabled={!isValid}>
        Save
      </button>
    </form>
  );
};

export default TimeEntryForm;
