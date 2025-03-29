import React, { memo } from 'react';

const BackgroundImage = memo(() => {
  const style = {
    backgroundImage: "url('/FOUNDATION_LOGO_BLACK.png')",
    opacity: 0.05,
    transform: "translateX(-10%)",
    zIndex: 0
  };

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={style}
      aria-hidden="true"
    />
  );
});

export default BackgroundImage;