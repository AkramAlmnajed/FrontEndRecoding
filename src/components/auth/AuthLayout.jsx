import React from 'react';
import LeftSide from './LeftSide';
import FooterImages from './FooterImages';
import LanguageSelector from './LanguageSelector';
import BackgroundImage from './BackgroundImage';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen w-screen">
      <LeftSide />
      
      <div className="w-1/2 h-full flex flex-col items-center justify-between relative">
        <LanguageSelector />
        <BackgroundImage />
        
        <div className="w-full max-w-[400px] px-8 z-50 mt-32">
          <h1 className="text-[30px] font-light font-oswald text-center mb-10 tracking-tight leading-none">
            {title}
          </h1>
          {children}
        </div>
        
        <FooterImages />
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);