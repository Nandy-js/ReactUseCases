import React, { ChangeEvent } from 'react';
import { TCarForm } from '../../../types';

interface FormRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: keyof TCarForm;
  placeholder?: string;
  type?: string;
  formValues: TCarForm;
  setFormValues: React.Dispatch<React.SetStateAction<TCarForm>>;
}

const FormRow = ({
  label,
  name,
  placeholder,
  type = 'text',
  formValues,
  setFormValues,
  ...props
}: FormRowProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target) {
          setFormValues((prevValues) => ({
            ...prevValues,
            photo: event?.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-2 sm:col-span-3">
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="pt-1">
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={formValues[name]}
          onChange={type === 'file' ? handleFileChange : handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
    </div>
  );
};

export default FormRow;
