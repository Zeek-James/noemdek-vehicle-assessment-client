import dayjs from "dayjs";
import "dayjs/locale/en";
import pic from "../../assests/hero.png";
import "dayjs/plugin/isSameOrBefore";
import { SetStateAction } from "react";
import { ScheduleProps, ScheduleTableProps, VehicleProps } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getWeekDates } from "./helpers";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  currentDate,
  setSelectedSchedule,
}) => {
  const {
    data: vehicleData,
    searchTerm,
    // filterValue,
    currentPage,
    pageSize,
  } = useSelector((state: RootState) => state.schedules);

  const filteredVehicleData = vehicleData.filter((data) => {
    const brand = data.brand.toLowerCase();
    const size = data.size.toLowerCase();
    const search = searchTerm.toLowerCase();

    // Filter by brand or size
    const isBrandMatch = brand.includes(search);
    const isSizeMatch = size.includes(search);

    // Filter by client, clients company or driver
    const isClientMatch = data.schedules.some((schedule) =>
      schedule.client.toLowerCase().includes(search)
    );

    const isClientsCompanyMatch = data.schedules.some((schedule) =>
      schedule.clients_company.toLowerCase().includes(search)
    );
    const isDriverMatch = data.schedules.some((schedule) =>
      schedule.driver.toLowerCase().includes(search)
    );

    return (
      isBrandMatch ||
      isSizeMatch ||
      isClientMatch ||
      isClientsCompanyMatch ||
      isDriverMatch
    );
  });

  const filteredAndPaginatedVehicleData = filteredVehicleData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const startOfWeek = dayjs(currentDate).day(1);
  const endOfWeek = startOfWeek.endOf("week").day(7);

  const weekDates = getWeekDates(startOfWeek, endOfWeek);

  const scheduleRows = filteredAndPaginatedVehicleData.map(
    (vehicle: VehicleProps, idx) => {
      const scheduleCells = weekDates.map((date: string, index: number) => {
        const schedule = vehicle.schedules.find(
          (s) =>
            s.startDate <= date &&
            s.endDate >= date &&
            (s.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
              s.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
              s.clients_company
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );

        const handleScheduleClick = () => {
          setSelectedSchedule(schedule as SetStateAction<ScheduleProps | null>);
        };

        if (schedule) {
          const isMultiDay = schedule.startDate !== schedule.endDate;
          const isFirstDay = index === 0 || schedule.startDate === date;
          const isLastDay = schedule.endDate === date;

          if (isMultiDay && isFirstDay) {
            return (
              <td
                key={date}
                onClick={handleScheduleClick}
                className="w-[110px] cursor-pointer hover:scale-105 transition-transform duration-300 max-h-fit py-2 border-b border-b-slate-300"
              >
                <div className="bg-blue-300 ml-[10px] h-[55px] rounded-l-md p-[5px] ">
                  <p className="text-[10px] font-bold">{schedule.driver}</p>
                  <p className="text-[10px] font-normal">{schedule.client}</p>
                  <p className="text-[10px] font-normal">
                    {schedule.clients_company}
                  </p>
                </div>
              </td>
            );
          }

          if (isMultiDay && !isFirstDay && !isLastDay) {
            return (
              <td
                key={date}
                onClick={handleScheduleClick}
                className="w-[110px] cursor-pointer hover:scale-105 transition-transform duration-300 max-h-fit py-2 border-b border-b-slate-300"
              >
                <div className="bg-blue-300 h-[55px]" />
              </td>
            );
          }

          if (isMultiDay && isLastDay) {
            return (
              <td
                key={date}
                onClick={handleScheduleClick}
                className="w-[110px] cursor-pointer hover:scale-105 transition-transform duration-300 max-h-fit py-2 border-b border-b-slate-300"
              >
                <div className="bg-blue-300 h-[55px] rounded-r-md mr-[10px]" />
              </td>
            );
          }

          return (
            <td
              key={date}
              onClick={handleScheduleClick}
              className="w-[110px] cursor-pointer hover:scale-105 transition-transform duration-300 max-h-fit rounded-md py-2 border-b border-b-slate-300"
            >
              <div className="bg-blue-300 ml-[10px] h-[55px] rounded-md p-[5px] flex flex-col justify-center ">
                <p className="text-[10px] font-bold">{schedule.driver}</p>
                <p className="text-[10px] font-normal">{schedule.client}</p>
                <p className="text-[10px] font-normal">
                  {schedule.clients_company}
                </p>
              </div>
            </td>
          );
        }

        return (
          <td key={date} className="w-[110px] py-2 border-b border-b-slate-300">
            <div className="min-h-[80px]" />
          </td>
        );
      });

      return (
        <tr key={idx} className="">
          <td className="border-r-2  w-[160px] border-slate-300  border-b border-b-slate-300">
            <div className="flex p-1  items-center gap-2">
              <img src={pic} alt="" className="w-[70px] object-contain" />
              <div className="space-y-1">
                <p className="font-bold text-[10px]">{vehicle.brand}</p>
                <p className="font-light text-[10px] text-gray-600">
                  {vehicle.size}
                </p>
                <p
                  className={`text-[10px] ${
                    vehicle.status ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {vehicle.status ? "Needs Repair" : "Great Condition"}
                </p>
              </div>
            </div>
          </td>
          {scheduleCells}
        </tr>
      );
    }
  );

  return (
    <div className="flex flex-col rounded-ss-md shadow-md border-l-2 border-t-2 border-gray-300 bg-white min-h-[62vh]">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="border-r-2 border-slate-300 border-b-2 border-b-slate-500">
              <p className="p-2 text-xs font-semibold">Vehicles</p>
            </th>
            {weekDates.map((date) => (
              <th
                key={date}
                className="border-b-2 border-slate-500 text-xs font-semibold"
              >
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{scheduleRows}</tbody>
      </table>
      <div className="flex-1  w-[175px] border-r-2  border-slate-300" />
    </div>
  );
};
