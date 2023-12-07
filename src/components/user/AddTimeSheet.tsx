import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import customerData from '../../utils/customer.json';
import FormField from '../common/FormField';

interface AddTimeSheetProps {}

const AddTimeSheet: React.FC<AddTimeSheetProps> = () => {
  const { register, setValue, getValues, formState: { errors }, defaultValue  } = useFormContext();
  const [projects, setProjects] = useState<string[]>(['Reports', 'Tracking', 'Booking', 'Private Marketing']);

  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer = customerData?.customers.find(
      (customer) => customer.name === event.target.value
    );
    const defaultProjects = selectedCustomer?.projects.map((project) => project.name) || [];
    setProjects(defaultProjects);
  };

  return (
    <>
      <FormField
        name="description"
        label="Description"
        type="text"
        register={register}
        registerConfig={{
          required: 'Fill the description',
        }}
        errors={errors}
        handleInputChange={(field) => (e) => setValue(`timeEntries[0].${field}`, e.target.value)}
        placeholder="Enter description"
      />

      <div className="flex flex-col">
        <label htmlFor="customer" className="text-sm font-semibold mb-1">
          Customer
        </label>
        <select
          className="p-4 my-2 bg-gray-100"
          {...register('customer', { defaultValue: customerData?.customers[0]?.name })}
          onChange={handleCustomerChange}
        >
          {customerData?.customers.map((customer, index) => (
            <option key={index} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
        {errors?.customer && (
          <div className="text-red-500 text-sm">
            {errors.customer.message}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="project" className="text-sm font-semibold mb-1">
          Project
        </label>
        <select
          className="p-4 my-2 bg-gray-100"
          {...register('project', { defaultValue: projects[0] })}
        >
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
        {errors?.project && (
          <div className="text-red-500 text-sm">
            {errors.project.message}
          </div>
        )}
      </div>

      <FormField
        name="hours"
        label="Hours"
        type="text"
        register={register}
        registerConfig={{
          required: 'Fill the hours',
          pattern: {
            value: /^[0-9]$/,
            message: 'Please enter a valid hours',
          },
        }}
        errors={errors}
        handleInputChange={(field) => (e) => setValue(`timeEntries[0].${field}`, e.target.value)}
        placeholder="Enter hours"
      />
    </>
  );
};

export default AddTimeSheet;
