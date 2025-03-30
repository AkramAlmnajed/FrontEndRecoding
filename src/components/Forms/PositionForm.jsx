import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from '../FormElements/error_message';

const PositionForm = memo(() => {

  const schema = Yup.object().shape({
    position: Yup.string().required('*'),
    department: Yup.string().required('*'),
    layer: Yup.string().required('*'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const positions = [
    { value: '', label: 'Select Position' },
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' }
  ];

  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' }
  ];

  const layers = [
    { value: '', label: 'Select Layer' },
    { value: 'executive', label: 'Executive' },
    { value: 'middle', label: 'Middle Management' },
    { value: 'junior', label: 'Junior Level' }
  ];

  return (
    <div className="w-full max-w-[400px] px-8 z-50 ">

      {/* Position Dropdown */}
      <div className="mb-8">
        <div className="flex items-center border-b border-gray-300 pb-2">
          <img
            src="/assets/DropDown.png"
            className="h-8 w-8 mr-3 opacity-40"
            alt="Position"
            loading="lazy"
          />
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full bg-transparent focus:outline-none text-lg appearance-none">
                {positions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          <ErrorMessage message={errors.position?.message} />
        </div>
      </div>

      {/* Department Dropdown */}
      <div className="mb-8">
        <div className="flex items-center border-b border-gray-300 pb-2">
          <img
            src="/assets/DropDown.png"
            className="h-8 w-8 mr-3 opacity-40"
            alt="Department"
            loading="lazy"
          />
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full bg-transparent focus:outline-none text-lg appearance-none">
                {departments.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          <ErrorMessage message={errors.department?.message} />
        </div>
      </div>

      {/* Layer Dropdown */}
      <div className="mb-10">
        <div className="flex items-center border-b border-gray-300 pb-2">
          <img
            src="/assets/DropDown.png"  // Add your layer icon
            className="h-8 w-8 mr-3 opacity-40"
            alt="Layer"
            loading="lazy"
          />
          <Controller
            name="layer"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full bg-transparent focus:outline-none text-lg appearance-none">
                {layers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          <ErrorMessage message={errors.layer?.message} />
        </div>
      </div>

      <SubmitButton onClick={handleSubmit(onSubmit)} text="Complete the registration" />
    </div>
  );
});
export default PositionForm;