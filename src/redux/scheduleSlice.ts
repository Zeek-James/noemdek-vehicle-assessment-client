import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchedulesState, VehicleProps } from "../types";
// import { vehicleData } from "../constants/data";
import axios from "axios";

// apiService.js

const API_BASE_URL = "http://localhost:3440";

// Thunk action to fetch schedule data from the API
export const fetchSchedule = createAsyncThunk(
  "schedules/fetchSchedules",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay

    const response = await axios(`${API_BASE_URL}/vehicles`);
    return response.data;
  }
);

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
          state.data = action.payload.reverse(); // Reverse the array to display in descending order
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
  setPageSize,
  clearSearchAndFilter,
} = schedulesSlice.actions;

export default schedulesSlice.reducer;
