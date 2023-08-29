import dayjs from "dayjs";

dayjs.locale("en");
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));

export interface ScheduleProps {
  schedule_id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  driver: string;
  client: string;
  clients_company: string;
  service: string;
  pick_up_location: string;
  drop_off_location: string;
  createdBy: string;
}

export type VehicleProps = {
  brand: string;
  id: number;
  schedules: ScheduleProps[];
  size: string;
  status: boolean;
};

export interface CalendarProps {
  currentDate: Date;
}

export interface SchedulePopupProps {
  selectedSchedule: ScheduleProps;
  setSelectedSchedule: React.Dispatch<
    React.SetStateAction<ScheduleProps | null>
  >;
}

export interface ScheduleTableProps {
  currentDate: dayjs.Dayjs;
  setSelectedSchedule: React.Dispatch<
    React.SetStateAction<ScheduleProps | null>
  >;
}

export type SearchBoxProps = {
  searchQuery: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface SchedulesState {
  data: VehicleProps[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filterValue: string;
  currentPage: number;
  pageSize: number;
  resizeEnd: number;
}
