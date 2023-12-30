import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const Flipper = ({ isFlipped, setIsFlipped }) => {
  const handleChange = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <div
      onClick={handleChange}
      className="flex justify-center items-center border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white px-2  rounded-full"
    >
      <FiRefreshCw />
    </div>
  );
};

export default Flipper;
