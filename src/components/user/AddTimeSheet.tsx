import { useState } from 'react';
import customerData from '../../utils/customer.json';

const AddTimeSheet = ({register, handleInputChange }) => {
  const [projects, setProjects] = useState<string[]>([]);

  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer = customerData?.customers.find(
      (customer) => customer.name === event.target.value
    );
    setProjects(selectedCustomer?.projects.map((project) => project.name) || []);
  };

  return (

   <> <input
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
  /></>
  )
}

export default AddTimeSheet