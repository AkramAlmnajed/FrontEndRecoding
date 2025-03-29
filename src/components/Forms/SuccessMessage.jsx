import React, { memo } from 'react';

const SuccessMessage = memo(({ 
  icon = "/Mark.png",
  title,
  description,
  redirectText = "You will be redirected to the login page."
}) => (
  <div className="w-full max-w-[400px] px-8 z-50 mt-32 text-center">
    {/* Checkmark icon */}
    <img 
      src={icon} 
      alt="Success" 
      className="w-12 h-12 mx-auto mb-6"
    />
    
    {/* Dynamic title */}
    <h1 className="text-[30px] font-light font-oswald text-center mb-4 tracking-tight leading-none">
      {title}
    </h1>
    
    {/* Dynamic content */}
    <div className="text-gray-600 text-sm">
      {description}<br />
      {redirectText}
    </div>
  </div>
));

export default SuccessMessage;