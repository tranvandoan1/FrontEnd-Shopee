import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SaveOrderAPI, { add, remove, upload } from "../API/SaveOrder";

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
    return saveorder;
  }
);
export const uploadSaveOrder = createAsyncThunk(
  "saveorders/uploadSaveOrder",
  async (data) => {
    console.log(data)
    const { data: saveorder } = await upload(data.id, data.dataUpload);
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
    builder.addCase(uploadSaveOrder.fulfilled, (state, action) => {
      console.log(action.payload, "vào rồi");

      state.value = action.payload;
    });
    builder.addCase(removeSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default saveOrderSlice.reducer;
