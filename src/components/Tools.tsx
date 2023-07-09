import { TbSettings } from "react-icons/tb";

import React from "react";

const Tools: React.FC = () => {
  // Function to handle tools click
  const handleToolClick = () => {
    // Do something when the notification is clicked
    // For example, show a list of notifications or navigate to a notifications page
    alert("You Have reached the tools section");
  };

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleToolClick}
    >
      <TbSettings className="text-xl" />
      <p className="text-xs">Tools </p>
    </div>
  );
};

export default Tools;
