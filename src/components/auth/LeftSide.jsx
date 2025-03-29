import React, { memo } from 'react';

const LeftSide = memo(() => {
  const imageStyle = {
    objectPosition: "left center",
    transform: "translateX(-15%)"
  };

  return (
    <div className="w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
      <div className="h-full w-[110%] -ml-20">
        <img
          src="/Platform_LOGO_Trasparent.png"
          className="object-cover w-full h-full origin-top-left rounded-[1000px]"
          style={imageStyle}
          alt="Platform Logo"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <h1 className="text-4xl font-oswald font-light text-center" style={{ transform: "translateX(-50%)" }}>
          Your Text Here
        </h1>
      </div>
    </div>
  );
});

export default LeftSide;