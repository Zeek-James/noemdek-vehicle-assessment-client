// helpers.ts
import dayjs, { Dayjs } from "dayjs";
import { ScheduleProps, VehicleProps } from "../../types";

// Helper function to navigate to previous week
export const goToPreviousWeek = (
  setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>
) => {
  setCurrentDate((prevDate) => prevDate.subtract(1, "week"));
};

// Helper function to navigate to next week
export const goToNextWeek = (
  setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>
) => {
  setCurrentDate((prevDate) => prevDate.add(1, "week"));
};

// Helper function to get an array of dates for the given week (starting from Sunday)
export const getWeekDates = (
  startOfWeek: dayjs.Dayjs,
  endOfWeek: dayjs.Dayjs
): string[] => {
  const dates: string[] = [];
  let current: Dayjs = startOfWeek;

  while (current.isSameOrBefore(endOfWeek)) {
    dates.push(current.toISOString().split("T")[0]);
    current = current.add(1, "day");
  }

  return dates;
};

// Helper function to get vehicle informations
export const getVehicleInfo = (
  schedule: ScheduleProps,
  vehicleData: VehicleProps[]
): VehicleProps | undefined => {
  return vehicleData?.find((vehicle) =>
    vehicle?.schedules?.some((s) => s === schedule)
  );
};
