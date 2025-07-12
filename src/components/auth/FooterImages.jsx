import React, { memo } from 'react';

const FooterImages = memo(() => {
  const images = [
    { src: "/assets/MOSAICCOLOR.png", alt: "Mosaic", className: "w-24 h-24 object-contain" },
    { src: "/assets/Platform_Horizontal_Transparent.png", alt: "Platform", className: "w-72 h-24 opacity-80 object-contain" },
    { src: "/assets/FOUNDATION_BLACK.png", alt: "Foundation", className: "w-72 h-28 object-contain" }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 pb-4 md:pb-8 px-4">
      <div className="flex items-center">
        <img {...images[0]} loading="lazy" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
        <div className="h-16 md:h-24 border-l border-gray-300 mx-2 md:mx-4"></div>
      </div>
      <div className="flex items-center">
        <img {...images[1]} loading="lazy" className="w-48 h-16 md:w-72 md:h-24 opacity-80 object-contain" />
        <div className="h-16 md:h-24 border-l border-gray-300 mx-2 md:mx-4"></div>
      </div>
      <img {...images[2]} loading="lazy" className="w-48 h-20 md:w-72 md:h-28 object-contain" />
    </div>
  );
});

export default FooterImages;