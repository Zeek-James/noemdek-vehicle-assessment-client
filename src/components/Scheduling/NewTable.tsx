import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/plugin/isSameOrBefore";
import { DragDropContext } from "react-beautiful-dnd";

import { ScheduleTableProps } from "../../types";
import { getWeekDates } from "./helpers";
// import useScheduleRows from "./ScheduleRows";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import useScheduleRows from "./Rows";
import { useDispatch } from "react-redux";
import { scheduleDragAndDropUpdate } from "../../redux/scheduleSlice";
// import useScheduleRows from "./NewScheduleRows";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  currentDate,
  setSelectedSchedule,
}) => {
  const startOfWeek = dayjs(currentDate).day(1);
  const endOfWeek = startOfWeek.endOf("week").day(7);

  const { data } = useSelector((state: RootState) => state.schedules);
  const dispatch = useDispatch();
  // const [stores, setStores] = useState(data);

  const weekDates = getWeekDates(startOfWeek, endOfWeek);
  const scheduleRows = useScheduleRows({ currentDate, setSelectedSchedule });

  const handleDragAndDrop = (results: any) => {
    // console.log(results);

    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...data];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
      console.log("newStores: ", reorderedStores, data, storeSourceIndex);

      return dispatch(scheduleDragAndDropUpdate(reorderedStores));
    }
    const scheduleSourceIndex = source.index;
    const scheduleDestinationIndex = destination.index;

    const vehicleSourceIndex = data.findIndex(
      (vehicle) => vehicle.id === source.droppableId
    );

    const vehicleDestinationIndex = data.findIndex(
      (vehicle) => vehicle.id === destination.droppableId
    );

    const newSourceSchedules = [...data[vehicleSourceIndex].schedules];

    // console.log(scheduleSourceIndex, vehicleSourceIndex, newSourceSchedules);

    const newDestinationSchedules =
      source.droppableId !== destination.droppableId
        ? [...data[vehicleDestinationIndex].schedules]
        : newSourceSchedules;

    const [deletedSchedule] = newSourceSchedules.splice(scheduleSourceIndex, 1);
    newDestinationSchedules.splice(
      scheduleDestinationIndex,
      0,
      deletedSchedule
    );

    const returnData = [...data];
    console.log(
      "returnData: ",
      returnData,
      "s: ",
      deletedSchedule,
      newSourceSchedules
    );

    returnData[vehicleSourceIndex] = {
      ...data[vehicleSourceIndex],
      schedules: newSourceSchedules,
    };
    returnData[vehicleDestinationIndex] = {
      ...data[vehicleDestinationIndex],
      schedules: newDestinationSchedules,
    };

    dispatch(scheduleDragAndDropUpdate(returnData));
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="flex flex-col rounded-ss-md shadow-md border-l-2 border-t-2 border-gray-300 bg-white min-h-[62vh]">
        <div className="w-full">
          <div>
            <div className="flex">
              <p className="border-r-2 w-[205px] border-slate-300 border-b-2 border-b-slate-500 p-2  text-xs font-semibold text-center">
                Vehicles
              </p>

              <div className="border-r-2 border-slate-300 border-b-2 border-b-slate-500 w-full justify-between  items-center flex">
                {weekDates.map((date) => (
                  <p
                    key={date}
                    className=" text-xs font-semibold text-center  w-full"
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                    })}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {scheduleRows}
        </div>
        <div className="flex-1  w-[173px] border-r-2  border-slate-300" />
      </div>
    </DragDropContext>
  );
};
