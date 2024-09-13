import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
