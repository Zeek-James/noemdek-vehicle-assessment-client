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

  const handleDragAndDrop = async (results: any) => {
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const itemSourceIndex = source.index;

    const itemDestinationIndex = destination.index;
    console.log(
      "itemSourceIndex: ",
      itemSourceIndex,
      "itemDestinationIndex: ",
      itemDestinationIndex
    );

    const scheduleSourceIndex = data.findIndex(
      (schedule) => schedule.id === source.droppableId
    );
    const scheduleDestinationIndex = data.findIndex(
      (schedule) => schedule.id === destination.droppableId
    );

    const newSourceItems = [...data[scheduleSourceIndex].schedules];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...data[scheduleDestinationIndex].schedules]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newSchedules = [...data];

    newSchedules[scheduleSourceIndex] = {
      ...data[scheduleSourceIndex],
      schedules: newSourceItems,
    };
    newSchedules[scheduleDestinationIndex] = {
      ...data[scheduleDestinationIndex],
      schedules: newDestinationItems,
    };

    dispatch(scheduleDragAndDropUpdate(newSchedules));
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="flex flex-col rounded-ss-md shadow-md border-l-2 border-t-2 border-gray-300 bg-white min-h-[62vh]">
        <table className="w-full  ">
          <thead>
            <tr>
              <th className="border-r-2 w-[180px] border-slate-300 border-b-2 border-b-slate-500">
                <p className="p-2  text-xs font-semibold">Vehicles</p>
              </th>

              <th className="border-r-2 border-slate-300 border-b-2 border-b-slate-500">
                <div className="flex w-full justify-between  items-center">
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
              </th>
            </tr>
          </thead>
          {scheduleRows}
        </table>
        <div className="flex-1  w-[181px] border-r-2  border-slate-300" />
      </div>
    </DragDropContext>
  );
};
