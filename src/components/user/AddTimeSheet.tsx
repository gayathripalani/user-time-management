import { useState } from 'react';
import customerData from '../../utils/customer.json';
interface AddTimeSheetProps {
  register: any;
  handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTimeSheet: React.FC<AddTimeSheetProps>  = ({ register, handleInputChange }) => {
  const [projects, setProjects] = useState<string[]>(['Reports']);

  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer = customerData?.customers.find(
      (customer) => customer.name === event.target.value
    );
    const defaultProjects = selectedCustomer?.projects.map((project) => project.name) || [];
    setProjects(defaultProjects);
  };

  return (
    <>
      <input
        className="p-4 my-2 bg-gray-100"
        placeholder="Description"
        type="text"
        {...register('description')}
        onChange={handleInputChange('description')}
      />
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
    </>
  );
};

export default AddTimeSheet;
