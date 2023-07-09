import React from "react";
import { BsPerson } from "react-icons/bs";
import { MdHome, MdOutlineArrowDropDown } from "react-icons/md";
import { routes } from "../config/routes";

const MenuBar: React.FC = () => {
  // Implement the MenuBar component here
  return (
    <div className="overflow-scroll flex md:flex-col  justify-around md:justify-start md:gap-6 text-white bg-[#0A6EBD]  w-[190px] md:h-screen  fixed md:relative bottom-0 sm:bottom-auto pb-5">
      <div className="flex flex-col justify-center items-center gap-4 w-full p-10 border-b-2 border-white">
        <div className="bg-slate-200 rounded-full">
          <BsPerson className="m-8 text-gray-300 text-6xl" />
        </div>
        <p className="text-[12px] font-semibold leading-[2px]">Kemi Tunde</p>
        <p className="text-[10px] font-light mb-[20px]">Admin</p>
        <div className="flex gap-2 items-center">
          <MdHome className="text-xl" />
          <span className="text-[12px] font-semibold"> Home</span>
        </div>
      </div>
      <div className="flex flex-col justify-center  gap-2  w-full">
        {routes.map(({ title, subMenu, menuIcon: MenuIcon }, idx) => (
          <p
            key={idx}
            className="flex items-center mx-2 hover:bg-white hover:text-[#0A6EBD] px-2 py-3 rounded-md gap-3 cursor-pointer"
          >
            {MenuIcon && <MenuIcon className="text-xl" />}{" "}
            <span className="font-semibold text-[12px]">{title}</span>
            {subMenu && <MdOutlineArrowDropDown className="ml-auto" />}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
