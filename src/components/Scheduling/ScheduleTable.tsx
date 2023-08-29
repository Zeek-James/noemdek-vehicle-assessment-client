import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/plugin/isSameOrBefore";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { ScheduleTableProps } from "../../types";
import { getWeekDates } from "./helpers";
import useScheduleRows from "./ScheduleRows";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  currentDate,
  setSelectedSchedule,
}) => {
  const startOfWeek = dayjs(currentDate).day(1);
  const endOfWeek = startOfWeek.endOf("week").day(7);

  const { data } = useSelector((state: RootState) => state.schedules);
  const [stores, setStores] = useState(data);

  const weekDates = getWeekDates(startOfWeek, endOfWeek);
  const scheduleRows = useScheduleRows({ currentDate, setSelectedSchedule });

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].schedules];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].schedules]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      schedules: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      schedules: newDestinationItems,
    };

    setStores(newStores);
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="flex flex-col rounded-ss-md shadow-md border-l-2 border-t-2 border-gray-300 bg-white min-h-[62vh]">
        <table className="w-full  ">
          <thead>
            <tr>
              <th className="border-r-2 border-slate-300 border-b-2 border-b-slate-500">
                <p className="p-2 text-xs font-semibold">Vehicles</p>
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
        <div className="flex-1  w-[175px] border-r-2  border-slate-300" />
      </div>
    </DragDropContext>
  );
};
