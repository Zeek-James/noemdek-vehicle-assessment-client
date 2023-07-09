import { FaPeopleLine } from "react-icons/fa6";
import { TbSettings, TbDatabaseDollar } from "react-icons/tb";
import { PiFilesLight } from "react-icons/pi";
import { CiShoppingTag } from "react-icons/ci";

export const routes = [
  { title: "Business Development", menuIcon: FaPeopleLine, subMenu: [] },
  {
    title: "Reservations",
    menuIcon: CiShoppingTag,
    subMenu: ["Bookings"],
  },
  // { title: "Bookings", subMenu: ["Bookings"] },
  { title: "Scheduling" },
  { title: "Operations", menuIcon: TbDatabaseDollar, subMenu: [] },
  { title: "Iinfrastructure", menuIcon: PiFilesLight, subMenu: [] },
  { title: "Reports & Tools", menuIcon: TbDatabaseDollar, subMenu: [] },
  { title: "Setup", menuIcon: TbSettings, subMenu: [] },
];
