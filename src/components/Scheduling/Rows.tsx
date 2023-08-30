import dayjs from "dayjs";
import "dayjs/locale/en";
import React, { SetStateAction } from "react";
import useFilteredVehicleData from "./hooks/useFilteredVehicleData";
import { VehicleProps } from "../../types";
import { getWeekDates } from "./helpers";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ScheduleTableProps } from "../../types";
import pic from "../../assests/hero.png";
import { ScheduleProps } from "../../types";
import { Draggable, Droppable } from "react-beautiful-dnd";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

const useScheduleRows: React.FC<ScheduleTableProps> = ({
  setSelectedSchedule,
  currentDate,
}) => {
  const { searchTerm } = useSelector((state: RootState) => state.schedules);

  const startOfWeek = dayjs(currentDate).day(1);
  const endOfWeek = startOfWeek.endOf("week").day(7);

  const weekDates = getWeekDates(startOfWeek, endOfWeek);

  const filteredAndPaginatedVehicleData = useFilteredVehicleData();

  const scheduleRows = filteredAndPaginatedVehicleData.map(
    (vehicle: VehicleProps, idx) => {
      const { brand } = vehicle;
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
        let sch = 0;
        if (schedule) {
          const scheduleIndex = vehicle.schedules.findIndex(
            (s) =>
              s.startDate <= schedule.startDate &&
              s.endDate >= schedule.endDate &&
              (s.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.clients_company
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
          );
          sch = scheduleIndex;
        }

        console.log(sch);

        const handleScheduleClick = () => {
          setSelectedSchedule(schedule as SetStateAction<ScheduleProps | null>);
        };

        if (schedule) {
          return (
            <Draggable
              draggableId={schedule.schedule_id.toString()}
              index={sch}
              key={schedule.schedule_id}
            >
              {(provided) => (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  // onClick={handleScheduleClick}
                  className=" w-[110px]  hover:scale-105  cursor-pointer transition-transform duration-300 max-h-fit rounded-md py-2  relative"
                >
                  <div className="bg-blue-300 ml-[10px] h-[55px] rounded-md p-[5px] flex flex-col justify-center z-20 relative">
                    <p className="text-[10px] font-bold">{schedule.driver}</p>
                    <p className="text-[10px] font-normal">
                      {schedule.startDate}
                    </p>
                    <p className="text-[10px] font-normal">
                      {schedule.clients_company}
                    </p>
                  </div>
                </div>
              )}
            </Draggable>
          );
        }

        return (
          <div key={date} className="w-[110px] py-2 ">
            <div className="min-h-[80px]" />
          </div>
        );
      });

      return (
        <Draggable draggableId={vehicle.id} index={idx} key={vehicle.id}>
          {(provided) => (
            <div
              className="flex"
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className="border-r-2  w-[208px] border-slate-300  border-b border-b-slate-300">
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
              </div>
              <Droppable droppableId={vehicle.id} direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="w-full"
                  >
                    <div className="flex w-full  justify-around border-b border-b-slate-300 items-center min-h-[100px]">
                      {scheduleCells}
                      {/* {provided.placeholder} */}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      );
    }
  );
  return (
    <Droppable droppableId="ROOT" type="group">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {scheduleRows}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default useScheduleRows;