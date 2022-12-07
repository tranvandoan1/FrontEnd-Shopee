import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const checkOutSlice = createSlice({
  name: "checkout",
  initialState: {
    value: [],
  },
  reducers: {
    addData(state, action) {
      state.value.push(action.payload);
    },
  },
});
export const { addData } = checkOutSlice.actions;
export default checkOutSlice.reducer;
