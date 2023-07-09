import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/plugin/isSameOrBefore";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import SchedulePopup from "./SchedulePopup";
import { ScheduleProps } from "../../types";
import { ScheduleTable } from "./ScheduleTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchSchedule } from "../../redux/scheduleSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../LoadingIndicator";
import { goToNextWeek, goToPreviousWeek } from "./helpers";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

export const Scheduling = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useSelector((state: RootState) => state.schedules);

  // State variables
  const [currentDate, setCurrentDate] = useState(() => {
    const today = dayjs();
    const startOfWeek = today.startOf("week").day(0);
    return startOfWeek;
  });
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleProps | null>(null);

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div>
      <div className="flex text justify-center gap-8 text-black font-bold text-base mb-1">
        <button
          className="text-bold"
          onClick={() => goToPreviousWeek(setCurrentDate)}
        >
          {" "}
          <BiSolidChevronLeft />
        </button>
        <span className="text-xs font-bold">
          {currentDate.format("MMMM D")} -{" "}
          {currentDate.add(6, "day").format("D, YYYY")}
        </span>
        <button
          className="text-bold"
          onClick={() => goToNextWeek(setCurrentDate)}
        >
          {" "}
          <BiSolidChevronRight />
        </button>
      </div>

      <ScheduleTable
        currentDate={currentDate}
        setSelectedSchedule={setSelectedSchedule}
      />
      {selectedSchedule && (
        <SchedulePopup
          selectedSchedule={selectedSchedule}
          // getVehicleInfo={getVehicleInfo}
          setSelectedSchedule={setSelectedSchedule}
        />
      )}
    </div>
  );
};
