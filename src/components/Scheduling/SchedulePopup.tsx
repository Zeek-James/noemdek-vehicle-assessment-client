import React from "react";
import { IoMdClose } from "react-icons/io";
import pic from "../../assests/hero.png";
import { SchedulePopupProps } from "../../types";
import { getVehicleInfo } from "./helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SchedulePopup: React.FC<SchedulePopupProps> = ({
  selectedSchedule,
  setSelectedSchedule,
}) => {
  const { data: vehicleData } = useSelector(
    (state: RootState) => state.schedules
  );

  const closeSchedulePopup = () => {
    setSelectedSchedule(null);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 bg-black/70
        
        `}
    >
      <div
        className={`absolute bg-white rounded-md shadow-lg transition-opacity duration-300`}
        style={{ width: "400px" }}
      >
        <div className="flex p-4 justify-between items-center border-b-2 border-[#0A6EBD]">
          <h3 className="text-xl font-bold ">Schedule Overview</h3>
          <button
            className=" text-gray-500   rounded-md"
            onClick={closeSchedulePopup}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="p-4 pb-2 border-b border-gray-300 mb-2">
          <div className="flex p-1 items-center gap-2">
            <img src={pic} alt="" className="w-[150px] object-contain" />
            <div className="space-y-1">
              {getVehicleInfo(selectedSchedule, vehicleData) && (
                <>
                  <p> {getVehicleInfo(selectedSchedule, vehicleData)?.brand}</p>
                  <p>{getVehicleInfo(selectedSchedule, vehicleData)?.size}</p>
                  <p
                    className={`text-[10px] ${
                      getVehicleInfo(selectedSchedule, vehicleData)?.status
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    Status:{" "}
                    {getVehicleInfo(selectedSchedule, vehicleData)?.status
                      ? "Needs Repair"
                      : "Great Condition"}
                  </p>
                </>
              )}
            </div>
          </div>
          <table className="">
            <tbody>
              <tr>
                <td className="w-[90px]  text-xs font-bold mb-[100px]">
                  <div className="py-2">Driver:</div>
                </td>
                <td className="text-xs text-gray-500 ml-2">
                  <div className="py-2">{selectedSchedule.driver}</div>
                </td>
              </tr>
              <tr>
                <td className="w-[90px]  text-xs font-bold mb-[100px]">
                  <div className="py-2">Customer:</div>
                </td>
                <td className="text-xs text-gray-500 ml-2">
                  <div className="py-2">{selectedSchedule.client}</div>
                </td>
              </tr>
              <tr>
                <td className="w-[90px]  text-xs font-bold mb-[100px]">
                  <div className="py-2">Service:</div>
                </td>
                <td className="text-xs text-gray-500 ml-2">
                  <div className="py-2">{selectedSchedule.service}</div>
                </td>
              </tr>
              <tr>
                <td className="w-[90px]  text-xs font-bold mb-[100px]">
                  <div className="py-2">Start Date:</div>
                </td>
                <td className="text-xs text-gray-500 ml-2">
                  <div className="py-2">
                    {selectedSchedule.startDate}, {selectedSchedule.startTime}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-[90px]  text-xs font-bold mb-[100px]">
                  <div className="py-2">End Date:</div>
                </td>
                <td className="text-xs text-gray-500 ml-2">
                  <div className="py-2">
                    {selectedSchedule.endDate}, {selectedSchedule.endTime}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs my-3">
            <p className="font-bold">Pickup Location:</p>
            <small className="text-gray-500">
              {selectedSchedule.pick_up_location}
            </small>
          </div>
          <div className="text-xs mb-2">
            <p className="font-bold">Drop-off Location:</p>
            <small className="text-gray-500">
              {selectedSchedule.drop_off_location}
            </small>
          </div>

          <textarea
            name=""
            id=""
            className="block w-full min-h-[100px] mt-6 rounded-md border border-gray-400 "
          ></textarea>
        </div>
        <div className="p-4 flex justify-between text-xs text-gray-500">
          <p className="">Created By: {selectedSchedule.createdBy}</p>
          <p className="">Last Edit By: {""}</p>
        </div>
      </div>
    </div>
  );
};

export default SchedulePopup;
