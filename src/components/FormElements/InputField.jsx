import { memo } from 'react';

const InputField = memo(({ type, icon, placeholder, ...props }, ref) => (
  <div className="mb-7">
    <div className="flex items-center border-b border-gray-300 pb-2">
      <img
        src={icon}
        className="h-8 w-8 mr-3 opacity-40"
        alt={`${type} icon`}
        loading="lazy"
      />
      <input
        type={type}
        className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-lg"
        placeholder={placeholder}
        aria-label={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  </div>
));

export default InputField;