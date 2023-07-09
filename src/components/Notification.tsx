import { IoNotificationsSharp } from "react-icons/io5";
import React, { useState } from "react";

const Notification: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(1);

  // Function to handle notification click
  const handleNotificationClick = () => {
    // Do something when the notification is clicked
    // For example, show a list of notifications or navigate to a notifications page
    alert("You Have a Notification");
    setNotificationCount(2);
  };

  return (
    <div
      className="flex gap-2 cursor-pointer items-center"
      onClick={handleNotificationClick}
    >
      <div className="flex">
        <IoNotificationsSharp className="text-lg" />
        {notificationCount > 0 && (
          <span className="h-2 w-2 bg-red-500 rounded-full" />
        )}
      </div>
      <p className="text-xs">Notifications</p>
    </div>
  );
};

export default Notification;
