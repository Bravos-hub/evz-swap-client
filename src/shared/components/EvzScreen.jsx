import React from 'react';

const EvzScreen = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-evz-bg flex justify-center items-stretch text-evz-textPrimary font-sans ${className}`}>
      <div className="w-full max-w-[420px] min-h-screen p-6 sm:p-5 flex flex-col box-border">
        {children}
      </div>
    </div>
  );
};

export default EvzScreen;
