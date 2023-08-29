import React, { useEffect, useRef } from "react";
import { setUpdatedSchedule } from "../redux/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleProps } from "../types";
import { RootState } from "../redux/store";

type ResizeableItemProps = {
  brand: string;
  index: number;
  day?: string;
  schedule: ScheduleProps;
};
const ResizableItem = ({ brand, day, schedule }: ResizeableItemProps) => {
  const { data } = useSelector((state: RootState) => state.schedules);

  const ref = useRef<HTMLDivElement | null>(null);
  const refLeft = useRef<HTMLDivElement | null>(null);
  const refRight = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const resizeableEle = ref.current;
    if (resizeableEle) {
      const styles = window.getComputedStyle(resizeableEle);
      let width = parseInt(styles.width, 10);
      let x = 0;

      // Right resize
      const onMouseMoveRightResize = async (event: any) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;

        const brandToUpdate = data.find((data) => data.brand === brand);

        if (dx > 0 && brandToUpdate) {
          const scheduleIndex = brandToUpdate.schedules.findIndex(
            (s) => s.schedule_id === schedule.schedule_id
          );

          if (
            scheduleIndex !== -1 &&
            scheduleIndex < brandToUpdate.schedules.length - 1
          ) {
            const nextSchedule = brandToUpdate.schedules[scheduleIndex + 1];

            const scheduleEndDate = new Date(schedule.endDate);
            const nextScheduleStartDate = new Date(nextSchedule.startDate);

            const timeDiffMilliseconds =
              nextScheduleStartDate.getTime() - scheduleEndDate.getTime();
            const diffInDays = timeDiffMilliseconds / (24 * 60 * 60 * 1000);

            // Calculate the maximum width based on diffInDays
            const maxAllowedWidth = diffInDays * 110;

            if (diffInDays === 1) {
              width = Math.min(maxAllowedWidth, 100);
            } else {
              width = Math.min(maxAllowedWidth, width); // Limit width to the calculated maximum
            }
          }
        }

        resizeableEle.style.width = `${width}px`;
      };

      const onMouseUpRightResize = (event: any) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
        // Round up the width to the nearest 100 after mouse release
        const roundedWidth = Math.ceil(width / 110) * 110;
        const days = Math.ceil(width / 110) - 1;
        resizeableEle.style.width = `${roundedWidth}px`;

        const direction = "end";

        dispatch(
          setUpdatedSchedule({
            index: schedule.schedule_id,
            days,
            brand,
            direction,
          })
        );
        document.removeEventListener("mouseup", onMouseUpRightResize);
      };
      const onMouseDownRightResize = (
        // event: React.MouseEvent<HTMLDivElement, MouseEvent>
        event: any
      ) => {
        x = event.clientX;
        resizeableEle.style.left = styles.left;
        resizeableEle.style.right = "";
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };

      const onMouseMoveLeftResize = async (event: any) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width - dx;

        const brandToUpdate = data.find((data) => data.brand === brand);

        if (dx < 0 && brandToUpdate) {
          const scheduleIndex = brandToUpdate.schedules.findIndex(
            (s) => s.schedule_id === schedule.schedule_id
          );

          if (scheduleIndex !== -1 && scheduleIndex > 0) {
            const prevSchedule = brandToUpdate.schedules[scheduleIndex - 1];

            const prevScheduleEndDate = new Date(prevSchedule.endDate);
            const scheduleStartDate = new Date(schedule.startDate);

            const timeDiffMilliseconds =
              scheduleStartDate.getTime() - prevScheduleEndDate.getTime();
            const diffInDays = timeDiffMilliseconds / (24 * 60 * 60 * 1000);

            // Calculate the maximum width based on diffInDays
            const maxAllowedWidth = diffInDays * 110; // Adjust someFactor as needed

            if (diffInDays === 1) {
              width = Math.min(maxAllowedWidth, 100);
            } else {
              width = Math.min(maxAllowedWidth, width); // Limit width to the calculated maximum
            }
          }
        }

        resizeableEle.style.width = `${width}px`;
      };

      const onMouseUpLeftResize = (event: any) => {
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
        // Round up the width to the nearest 100 after mouse release
        const roundedWidth = Math.ceil(width / 100) * 100;
        const days = Math.ceil(width / 110) - 1;

        console.log(roundedWidth);

        resizeableEle.style.width = `${roundedWidth}px`;
        dispatch(
          setUpdatedSchedule({
            index: schedule.schedule_id,
            days,
            brand,
            direction: "start",
          })
        );

        document.removeEventListener("mouseup", onMouseUpLeftResize);
      };
      const onMouseDownLeftResize = (
        // event: React.MouseEvent<HTMLDivElement, MouseEvent>
        event: any
      ) => {
        x = event.clientX;
        resizeableEle.style.right = styles.right;
        resizeableEle.style.left = "";
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
      };
      // Add mouse down event listener
      const resizerRight = refRight.current;
      resizerRight?.addEventListener("mousedown", onMouseDownRightResize);
      const resizerLeft = refLeft.current;
      resizerLeft?.addEventListener("mousedown", onMouseDownLeftResize);
      return () => {
        resizerRight?.removeEventListener("mousedown", onMouseDownRightResize);
        resizerLeft?.removeEventListener("mousedown", onMouseDownLeftResize);
      };
    }
  }, []);

  return (
    <div
      className={`resizeable  ml-[7px] h-[55px] ${
        day === "first"
          ? "w-[88%] rounded-l-md"
          : day === "last"
          ? "w-[88%] rounded-r-md"
          : "w-[94%] rounded-md"
      } bg-blue-300   z-10`}
      // }   bg-pink-300 z-10`}
      ref={ref}
    >
      {day === "first" && (
        <div className="resizer resizer-l" ref={refLeft}></div>
      )}
      {day === "last" && (
        <div className="resizer resizer-r" ref={refRight}></div>
      )}
      {day === undefined && (
        <>
          <div className="resizer resizer-l" ref={refLeft}></div>

          <div className="resizer resizer-r" ref={refRight}></div>
        </>
      )}
    </div>
  );
};

export default ResizableItem;
