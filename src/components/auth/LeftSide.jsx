import React, { useState, useEffect, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const words = ["Resources", "Mobility" , "Ecology" , "Social" , "Economy"];

const LeftSide = memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
      <div
        className="h-full w-[90%] -ml-96 flex items-center justify-center"
        style={{
          animation: "spinleft 40s linear infinite",
        }}
      >
        <img
          src="/assets/Platform_LOGO_Trasparent.png"
          className="object-cover w-full h-full origin-center rounded-full"
          alt="Platform Logo"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none mr-96">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            className="text-4xl font-oswald font-light text-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
      <style>{`
        @keyframes spinleft {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(-360deg);}
        }
      `}</style>
    </div>
  );
});

export default LeftSide;
