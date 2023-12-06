import { useState } from 'react';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  register: any;
  registerConfig: any;
  errors: any;
  handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type, register, registerConfig, errors, handleInputChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        className={`p-4 my-2 bg-gray-100 ${errors && errors[name] ? 'border-1 border-red-500' : ''}`}
        type={type}
        placeholder={placeholder}
        {...register(name, registerConfig)} 
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleInputChange(name)(e);
        }}
      />
      {errors && errors[name] && (
        <div className="text-red-500 text-sm">
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

export default FormField;
