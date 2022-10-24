
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "loading",
};

export const globalPageSlice = createSlice({
  name: 'globalpage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setto: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setto } = globalPageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectGlobalPage = (state) => state.globalState.value;

export default globalPageSlice.reducer;