import React from "react";
import MenuBar from "./MenuBar";
import SearchBox from "./SearchBox";
import Notification from "./Notification";
import Tools from "./Tools";
import Help from "./Help";
import SchedulingInterface from "./Scheduling/SchedulingInterface";

type Props = {};

const Layout: React.FC = (props: Props) => {
  return (
    <div className="">
      <div className="lg:flex max-w-[1440px] overflow-hidden mx-auto bg-slate-200 min-h-screen shadow-lg hidden">
        <MenuBar />
        <div className="bg-inherit flex-1 p-4 pt-6">
          <div className="flex space-x-8 items-end">
            <SearchBox />
            <Notification />
            <Tools />
            <Help />
            <div className="">Logo</div>
          </div>
          <SchedulingInterface />
        </div>
      </div>
      <div className="flex justify-center items-center h-screen flex-col space-y-6 lg:hidden">
        <h1 className="font-bold text-3xl">
          App is Currently Built for Desktop View
        </h1>
        <p className="font-semibold text-gray-500">
          Please view with a Desktop, responsiveness still in progress
        </p>
      </div>
    </div>
  );
};

export default Layout;
