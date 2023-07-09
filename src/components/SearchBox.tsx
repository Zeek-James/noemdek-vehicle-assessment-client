import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setSearchTerm } from "../redux/scheduleSlice";
import { MdSearch } from "react-icons/md";
import { RootState } from "../redux/store";

const SearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.schedules);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setCurrentPage(1)); // Resets current page when search term changes
  };

  return (
    <div className="flex w-full items-center border-2 rounded-md p-2 max-w-sm bg-white border-gray-300 mr-auto gap-2 ">
      <MdSearch className="text-2xl" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="outline-none border-none focus:ring-0 p-0 text-sm w-full"
      />
    </div>
  );
};

export default SearchBox;
