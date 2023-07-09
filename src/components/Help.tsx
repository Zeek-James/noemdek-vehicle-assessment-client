import React from "react";
import { BiSolidHelpCircle } from "react-icons/bi";
const Help: React.FC = () => {
  // Function to handle tools click
  const handleHelpClick = () => {
    // Do something when the notification is clicked
    // For example, show a list of notifications or navigate to a notifications page
    alert("You Have reached the help section");
  };

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleHelpClick}
    >
      <BiSolidHelpCircle className="text-2xl" />
      <p className="text-sm">Help </p>
    </div>
  );
};

export default Help;
