import React, { memo } from 'react';
import SubmitButton from '../FormElements/SubmitButton';

const PositionForm = memo(() => {
    // Sample data for dropdowns
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
            <select className="w-full bg-transparent focus:outline-none text-lg appearance-none">
              {positions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            <select className="w-full bg-transparent focus:outline-none text-lg appearance-none">
              {departments.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            <select className="w-full bg-transparent focus:outline-none text-lg appearance-none">
              {layers.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <SubmitButton text="Complete the registration" />
      </div>
    );
  });
export default PositionForm;