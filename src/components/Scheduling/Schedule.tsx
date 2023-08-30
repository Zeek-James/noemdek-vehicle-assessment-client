import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/plugin/isSameOrBefore";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import SchedulePopup from "./SchedulePopup";
import { ScheduleProps } from "../../types";
// import { ScheduleTable } from "./ScheduleTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchSchedule } from "../../redux/scheduleSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../LoadingIndicator";
import { goToNextWeek, goToPreviousWeek } from "./helpers";
import { ScheduleTable } from "./NewTable";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

export const Scheduling = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, currentWeek } = useSelector(
    (state: RootState) => state.schedules
  );

  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleProps | null>(null);

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  if (isLoading) return <LoadingIndicator />;

  let currentWeekString = dayjs(currentWeek); // Convert back to dayjs instance

  return (
    <div>
      <div className="flex text justify-center gap-8 text-black font-bold text-base mb-1">
        <button
          className="text-bold"
          onClick={() => goToPreviousWeek(dispatch, dayjs(currentWeek))}
        >
          {" "}
          <BiSolidChevronLeft />
        </button>
        <span className="text-xs font-bold">
          {currentWeekString.format("MMMM D")} -{" "}
          {currentWeekString.add(6, "day").format("D, YYYY")}
        </span>
        <button
          className="text-bold"
          onClick={() => goToNextWeek(dispatch, dayjs(currentWeek))}
        >
          {" "}
          <BiSolidChevronRight />
        </button>
      </div>

      <ScheduleTable
        currentDate={currentWeekString}
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
