import React, { useState } from 'react';
import customerData from '../../utils/customer.json';
import { useFormContext } from 'react-hook-form';

interface AddTimeSheetProps {
   entry: any,
   index: number
}

const AddTimeSheet: React.FC<AddTimeSheetProps> = ({entry, index}) => {
  const { register, setValue, getValues, formState: { errors }  } = useFormContext();
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
    </>
  );
};

export default AddTimeSheet;
