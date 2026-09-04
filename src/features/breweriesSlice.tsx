import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Metadata } from "../types/meta";
import BrewMeta from "../../api/metadata";
import type { RootState } from "../app/store";
import BrewCountry from "../../api/country";
import type { BrewResults } from "../types/results";
import BrewRandom from "../../api/random";
import type { Brewery } from "../types/brewery";
import type { BrewCache } from "../types/cache";

interface BreweriesState {
  meta: Metadata;
  cache: BrewCache;
  breweries: BrewResults;
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
  cache: {},
  breweries: {
    pages: 0,
    current: 0,
    breweries: [],
    timestamp: 0,
    country: "",
  },
  random: null,
  loading: "idle",
};

export const fetchMetaData = createAsyncThunk(
  "breweries/fetchMetaData",
  async () => {
    const response = await BrewMeta();
    if (!response) {
      throw new Error("Failed to fetch metadata");
    }
    return response;
  },
);

interface Args {
  country: string;
  page?: number;
  perPage?: number;
}

export const fetchBreweriesRandom = createAsyncThunk(
  "breweries/fetchByCountry",
  async () => {
    const response = await BrewRandom();
    return response;
  },
);

export const fetchBreweriesByCountry = createAsyncThunk(
  "breweries/fetchRandom",
  async (query: Args): Promise<BrewResults | null> => {
    const response = await BrewCountry(
      query.country,
      query.page,
      query.perPage,
    );
    return response;
  },
);

export const breweriesSlice = createSlice({
  name: "breweriesSlice",
  initialState: initialState,
  reducers: {
    resetBreweries: (state) => {
      state.breweries = {
        pages: 0,
        current: 0,
        breweries: [],
        timestamp: 0,
        country: "",
      };
    },
    loadCache: (state, action) => {
      state.breweries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // For fetchMetaData
      .addCase(fetchMetaData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMetaData.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchMetaData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.meta = {
          ...action.payload,
          total: action.payload.total ?? 0,
          by_state: action.payload.by_state ?? {},
          by_country: action.payload.by_country ?? {},
          by_type: action.payload.by_type ?? {},
          page: action.payload.page ?? 0,
          per_page: action.payload.per_page ?? 0,
        };
      })

      // For fetchBreweriesByCountry
      .addCase(fetchBreweriesByCountry.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBreweriesByCountry.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(
        fetchBreweriesByCountry.fulfilled,
        (state, action: PayloadAction<BrewResults | null>) => {
          if (action.payload === null) {
            state.loading = "failed";
          } else {
            state.loading = "succeeded";
            state.breweries = { ...action.payload };

            // Update cache
            const { country, current } = action.payload;
            state.cache = {
              ...state.cache,
              [country]: {
                ...state.cache[country],
                [current]: action.payload,
              },
            };
          }
        },
      )

      // For fetchBreweriesRandom (if you have it)
      .addCase(fetchBreweriesRandom.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBreweriesRandom.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchBreweriesRandom.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (action.payload) {
          state.random = action.payload;
        }
      });
  },
});

export const selectBreweries = (state: RootState) =>
  state.breweriesSliceReducer;
export const { resetBreweries, loadCache } = breweriesSlice.actions;
export const breweriesState = breweriesSlice.reducer;
export default breweriesState;
