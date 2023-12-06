import { useState } from 'react';
import customerData from '../../utils/customer.json';
import FormField from '../common/FormField';

interface AddTimeSheetProps {
  register: any;
  errors: any;
  handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTimeSheet: React.FC<AddTimeSheetProps> = ({ register, errors, handleInputChange }) => {
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
        errors={errors}
        handleInputChange={handleInputChange}
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
        {errors && errors.customer && (
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
        {errors && errors.project && (
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
        errors={errors}
        handleInputChange={handleInputChange}
        placeholder="Enter hours"
      />

      <FormField
        name="comment"
        label="Comment"
        type="text"
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        placeholder="Enter comment"
      />
    </>
  );
};

export default AddTimeSheet;
