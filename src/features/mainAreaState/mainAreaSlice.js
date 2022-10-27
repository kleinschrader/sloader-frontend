
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "{\"state\":\"home\"}",
};

export const mainAreaSlice = createSlice({
  name: 'mainarea',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    ma_setto: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { ma_setto } = mainAreaSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectMainArea = (state) => state.mainArea.value;

export default mainAreaSlice.reducer;