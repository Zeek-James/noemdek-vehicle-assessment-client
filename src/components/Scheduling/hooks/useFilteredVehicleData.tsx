import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const useFilteredVehicleData = () => {
  const {
    data: vehicleData,
    searchTerm,
    // filterValue,
    currentPage,
    pageSize,
  } = useSelector((state: RootState) => state.schedules);

  // console.log(vehicleData);

  const filteredVehicleData = vehicleData.filter((data) => {
    const brand = data.brand.toLowerCase();
    const size = data.size.toLowerCase();
    const search = searchTerm.toLowerCase();
    // console.log(vehicleData);

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

  return filteredAndPaginatedVehicleData;
};

export default useFilteredVehicleData;
