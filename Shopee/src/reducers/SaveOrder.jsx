import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SaveOrderAPI, { add, remove } from "../API/SaveOrder";

export const getSaveOrder = createAsyncThunk(
  "saveorders/getSaveOrder",
  async () => {
    const { data: saveorder } = await SaveOrderAPI.getAll();
    return saveorder;
  }
);
export const addSaveOrder = createAsyncThunk(
  "saveorders/addSaveOrder",
  async (data) => {
    const { data: saveorder } = await add(data);
    return saveorder;
  }
);
export const removeSaveOrder = createAsyncThunk(
  "saveorders/removeSaveOrder",
  async (data) => {
    const { data: saveorder } = await remove(data);
    console.log(saveorder);
    return saveorder;
  }
);
const saveOrderSlice = createSlice({
  name: "saveorders",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeSaveOrder.fulfilled, (state, action) => {
      console.log(action.payload);
      // state.value = action.payload;
    });
  },
});
export default saveOrderSlice.reducer;
