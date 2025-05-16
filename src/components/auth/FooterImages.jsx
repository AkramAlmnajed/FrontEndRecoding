import React, { memo } from 'react';

const FooterImages = memo(() => {
  const images = [
    { src: "/assets/MOSAICCOLOR.png", alt: "Mosaic", className: "w-24 h-24 object-contain" },
    { src: "/assets/Platform_Horizontal_Transparent.png", alt: "Platform", className: "w-72 h-24 opacity-80 object-contain" },
    { src: "/assets/FOUNDATION_BLACK.png", alt: "Foundation", className: "w-72 h-28 object-contain" }
  ];

  return (
    <div className="w-full flex justify-center space-x-8 pb-8">
      <div className="flex items-center">
        <img {...images[0]} loading="lazy" />
        <div className="h-24 border-l border-gray-300 mx-4"></div>
      </div>
      <div className="flex items-center">
        <img {...images[1]} loading="lazy" />
        <div className="h-24 border-l border-gray-300 mx-4"></div>
      </div>
      <img {...images[2]} loading="lazy" />
    </div>
  );
});

export default FooterImages;