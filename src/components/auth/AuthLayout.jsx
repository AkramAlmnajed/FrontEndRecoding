import React from 'react';
import LeftSide from './LeftSide';
import FooterImages from './FooterImages';
import LanguageSelector from './LanguageSelector';
import BackgroundImage from './BackgroundImage';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row overflow-x-auto md:overflow-x-hidden">
      <LeftSide />
      
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-between relative min-w-[320px] max-w-full">
        <LanguageSelector />
        <BackgroundImage />
        
        <div className="w-full max-w-[400px] px-4 md:px-8 z-50 mt-16 md:mt-32">
          <h1 className="text-[24px] md:text-[30px] font-light font-oswald text-center mb-6 md:mb-10 tracking-tight leading-none">
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