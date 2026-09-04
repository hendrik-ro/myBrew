import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Brewery } from "../types/brewery";
import type { Metadata } from "../types/meta";
import BrewMeta from "../../api/metadata";
import type { RootState } from "../app/store";

interface BreweriesState {
  meta: Metadata;
  breweries: Brewery[];
  random: Brewery | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: BreweriesState = {
  meta: {
    total: 0,
    by_state: {},
    by_country: {},
    by_type: {},
    page: 0,
    per_page: 0,
  },
  breweries: [],
  random: null,
  loading: "idle",
};

export const fetchMetaData = createAsyncThunk(
  "breweries/fetchMetaData",
  async () => {
    const response = await BrewMeta();
    return response;
  },
);

export const breweriesSlice = createSlice({
  name: "breweriesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchMetaData, {
      pending: (state) => {
        state.loading = "pending";
      },
      rejected: (state) => {
        state.loading = "failed";
      },
      fulfilled: (state, action) => {
        state.loading = "succeeded";
        state.meta = { ...action.payload };
      },
    });
  },
});

export const selectBreweries = (state: RootState) =>
  state.breweriesSliceReducer;
export default breweriesSlice.reducer;
