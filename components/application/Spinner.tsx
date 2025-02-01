import React from "react";

const Spinner = () => {
  return (
    <div className="w-full flex mx-auto text-primary-foreground bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary/90 rounded text-center text-lg">
      <div className="w-8 h-8 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
