import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MobileData } from '../constants'

interface MobileDataState {
  data: MobileData[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: MobileDataState = {
  data: [],
  loading: false,
  error: null,
};

export const mobilesSlice = createSlice({
  name: 'mobiles',
  initialState,
  reducers: {
    // Action dispatched by a component to start the API call (watched by saga)
    fetchMobilesRequest: (state, action: PayloadAction<void>) => {
      state.loading = true;
      state.error = null;
    },
    // Action dispatched by the saga upon success
    fetchMobilesSuccess: (state, action: PayloadAction<MobileData[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    // Action dispatched by the saga upon failure
    fetchMobilesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMobilesRequest, fetchMobilesSuccess, fetchMobilesFailure } = mobilesSlice.actions;

export default mobilesSlice.reducer;