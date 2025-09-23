import { Icon } from "@iconify/react";
import { forwardRef, memo, useState } from "react";

const InputField = memo(
  forwardRef(({ type, icon, placeholder, password = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine the type of input
    const inputType = password ? (showPassword ? "text" : "password") : type;

    return (
      <div className="mb-7">
        <div
          className="
            flex items-center border-b border-gray-300 pb-2
            transition-colors duration-200
            hover:border-gray-500 focus-within:border-blue-500
          "
        >
          {icon && (
            <img
              src={icon}
              className="h-6 w-6 mr-3 opacity-50 transition-opacity duration-200"
              alt={`${inputType} icon`}
              loading="lazy"
            />
          )}

          <input
            type={inputType}
            className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-lg"
            placeholder={placeholder}
            aria-label={placeholder}
            ref={ref}
            {...props}
          />

          {password && (
            <Icon
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              width="24"
              height="24"
              title={showPassword ? "Hide password" : "Show password"}
            />
          )}
        </div>
      </div>
    );
  })
);

export default InputField;
