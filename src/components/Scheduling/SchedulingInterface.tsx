import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Scheduling } from "./Schedule";
import { Calendar } from "../Calendar";

const CustomDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Drivers");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="relative inline-block z-10">
      <button
        className="bg-white w-[200px] border rounded-md h-10 p-2 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 appearance-none text-gray-500 flex items-center justify-start pl-3"
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute bg-white mt-2 py-2 w-[200px] border rounded-md shadow-md`}
      >
        <ul>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
            onClick={() => handleOptionChange("Drivers")}
          >
            Drivers
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
            onClick={() => handleOptionChange("Vehicles")}
          >
            Vehicles
          </li>
        </ul>
      </div>
      <div
        className="absolute top-0 right-0 h-full flex items-center px-1 bg-gray-300 rounded-r-md"
        onClick={toggleDropdown}
      >
        <MdOutlineArrowDropDown className="text-lg text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
};

const SchedulingInterface: React.FC = () => {
  const [selectedView, setSelectedView] = useState<"day" | "week" | "month">(
    "week"
  );

  const handleViewChange = (view: "day" | "week" | "month") => {
    setSelectedView(view);
  };

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-semibold mb-2">Scheduling</h2>
      <div className="rounded-md shadow-md border-2 border-gray-300 h-full pl-4 pt-4">
        <div className="flex flex-col md:flex-row gap-x-12 mb-4">
          <div className="flex gap-3  text-xs items-center">
            <p className="font-bold">Schedule for</p>
            <CustomDropdown />
          </div>
          <div className="flex items-center text-xs">
            <p className="mr-3 font-bold">View:</p>
            <div className="bg-slate-100 rounded-md text-gray-500">
              <button
                className={`py-1 px-3 rounded-l-md ${
                  selectedView === "day" ? "bg-blue-700 text-white" : ""
                }`}
                onClick={() => handleViewChange("day")}
              >
                Day
              </button>
              <button
                className={`py-1 px-3 ${
                  selectedView === "week" ? "bg-blue-700 text-white" : ""
                }`}
                onClick={() => handleViewChange("week")}
              >
                Week
              </button>
              <button
                className={`py-1 px-3 rounded-r-md ${
                  selectedView === "month" ? "bg-blue-700 text-white" : ""
                }`}
                onClick={() => handleViewChange("month")}
              >
                Month
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4 min-h-[50vh]">
          <div className="w-[170px] relative top-12">
            <Calendar currentDate={new Date()} />
          </div>
          <div className="flex-1">
            {selectedView === "day" && <p>Day view implementation goes here</p>}
            {selectedView === "week" && <Scheduling />}
            {selectedView === "month" && (
              <p>Month view implementation goes here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingInterface;
