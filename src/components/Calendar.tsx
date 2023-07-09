import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Change the locale if needed
import "dayjs/plugin/weekOfYear";
import "dayjs/plugin/isSameOrBefore";
import "dayjs/plugin/isSameOrAfter";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { CalendarProps } from "../types";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/weekOfYear"));
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));
dayjs.extend(require("dayjs/plugin/isSameOrAfter"));

export const Calendar: React.FC<CalendarProps> = ({ currentDate }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs(currentDate));

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "month"));
  };

  const startOfMonth = currentMonth.startOf("month").startOf("week");
  const endOfMonth = currentMonth.endOf("month").endOf("week");

  const calendarDates = () => {
    const dates = [];
    let currentDate = startOfMonth;

    while (currentDate.isSameOrBefore(endOfMonth)) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };

  const renderCalendarDay = (date: dayjs.Dayjs) => {
    const isCurrentMonth = date.isSame(currentMonth, "month");
    const isCurrentDay = date.isSame(dayjs(), "day");
    const isSameWeek = date.isSame(dayjs(), "week");
    const dayClasses = `text-center text-[9px] p-1 ${
      isCurrentDay
        ? "bg-blue-500 text-white"
        : isSameWeek
        ? "bg-orange-300"
        : ""
    } ${!isCurrentMonth ? "text-gray-500" : ""}`;

    return (
      <div className={dayClasses} key={date.toString()}>
        {date.format("D")}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button className="text-bold" onClick={goToPreviousMonth}>
          <BiSolidChevronLeft />
        </button>
        <h1 className="text-black font-bold text-[9px]">
          {currentMonth.format("MMMM YYYY")}
        </h1>
        <button className="text-bold" onClick={goToNextMonth}>
          <BiSolidChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            className="text-center font-semibold text-[9px] text-gray-400 uppercase"
            key={day}
          >
            {day}
          </div>
        ))}
        {calendarDates().map((date) => renderCalendarDay(date))}
      </div>
    </div>
  );
};
