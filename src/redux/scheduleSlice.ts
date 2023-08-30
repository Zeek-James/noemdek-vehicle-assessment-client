import dayjs from "dayjs";
import "dayjs/locale/en";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SchedulesState, VehicleProps } from "../types";
// import { vehicleData } from "../constants/data";
import axios from "axios";

// apiService.js

const API_BASE_URL = "https://vehicle-service-y81m.onrender.com";

// Thunk action to fetch schedule data from the API
export const fetchSchedule = createAsyncThunk(
  "schedules/fetchSchedules",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay

    const response = await axios(`http://localhost:3440/vehicles`);
    return response.data;
  }
);

const today = dayjs();
const startOfWeek = today.startOf("week").day(0).format();
// return startOfWeek;

// Other API calls and functions...

const initialState: SchedulesState = {
  data: [],
  // data: vehicleData,
  isLoading: false,
  error: null,
  searchTerm: "",
  filterValue: "Vehicles",
  currentPage: 1,
  pageSize: 10,
  resizeEnd: 0,
  currentWeek: startOfWeek,
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    clearSearchAndFilter: (state) => {
      state.searchTerm = "";
      state.filterValue = "Vehicles";
    },
    setUpdatedSchedule: (
      state,
      action: PayloadAction<{
        index: string;
        days: number;
        brand: string;
        direction: string;
      }>
    ) => {
      const { index, days, brand, direction } = action.payload;

      const brandToUpdate = state.data.find((data) => data.brand === brand);
      let updatedResizeEnd = state.resizeEnd;

      if (!brandToUpdate) {
        console.error("Brand not found");
        return state; // Return the original state
      }

      const scheduleToUpdate = brandToUpdate.schedules.find(
        (schedule) => schedule.schedule_id === index
      );

      if (!scheduleToUpdate) {
        console.error("Schedule not found");
        return state; // Return the original state
      }

      const isStartDirection = direction === "start";
      const dateToUpdate = isStartDirection
        ? scheduleToUpdate.startDate
        : scheduleToUpdate.endDate;
      const originalDate = new Date(dateToUpdate);

      const updatedDate = new Date(
        originalDate.getTime() +
          (isStartDirection ? -1 : 1) * days * 24 * 60 * 60 * 1000
      );

      if (!isStartDirection) {
        const scheduleIndex = brandToUpdate.schedules.findIndex(
          (schedule) => schedule.schedule_id === index
        );

        if (
          scheduleIndex !== -1 &&
          scheduleIndex < brandToUpdate.schedules.length - 1
        ) {
          const nextSchedule = brandToUpdate.schedules[scheduleIndex + 1];
          const nextScheduleStartDate = new Date(nextSchedule.startDate);

          if (updatedDate >= nextScheduleStartDate) {
            updatedDate.setDate(nextScheduleStartDate.getDate() - 1);
          }
        }
      }

      if (isStartDirection) {
        const scheduleIndex = brandToUpdate.schedules.findIndex(
          (schedule) => schedule.schedule_id === index
        );
        if (scheduleIndex !== -1 && scheduleIndex !== 0) {
          const nextSchedule = brandToUpdate.schedules[scheduleIndex - 1];
          const nextScheduleEndDate = new Date(nextSchedule.endDate);

          if (updatedDate <= nextScheduleEndDate) {
            updatedDate.setDate(nextScheduleEndDate.getDate() + 1);
          }
        }

        scheduleToUpdate.startDate = updatedDate.toISOString().split("T")[0];
      } else {
        scheduleToUpdate.endDate = updatedDate.toISOString().split("T")[0];
      }

      const updatedData = state.data.map((data) =>
        data.brand === brand
          ? { ...data, schedules: [...data.schedules] }
          : data
      );
      state.data = updatedData;
      state.resizeEnd = updatedResizeEnd;
    },

    scheduleDragAndDropUpdate: (
      state,
      action: PayloadAction<VehicleProps[]>
    ) => {
      state.data = action.payload; // Reverse the array to display in descending order
    },
    setCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchSchedule.fulfilled,
        (state, action: PayloadAction<VehicleProps[]>) => {
          state.isLoading = false;
          state.data = action.payload; // Reverse the array to display in descending order
        }
      )
      .addCase(fetchSchedule.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setFilter,
  setCurrentPage,
  setUpdatedSchedule,
  setPageSize,
  clearSearchAndFilter,
  scheduleDragAndDropUpdate,
  setCurrentWeek,
} = schedulesSlice.actions;

export default schedulesSlice.reducer;
