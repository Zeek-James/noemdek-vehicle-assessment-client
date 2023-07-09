import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></span>
    </div>
  );
};

export default LoadingIndicator;
