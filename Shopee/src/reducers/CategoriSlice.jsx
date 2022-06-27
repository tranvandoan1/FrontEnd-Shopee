import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CateAPI, { add } from "./../API/Categoris";

export const getCate = createAsyncThunk("categori/getCate", async () => {
  const { data: categoris } = await CateAPI.getAll();
  return categoris;
});

const categoriSlice = createSlice({
  name: "categori",
  initialState: {
    value: [],
  },
  reducers: {
    addCate(state, action) {
      state.value.push(action.payload);
    },
    removeCate(state, action) {
      state.value = action.payload.data.filter(
        (item) => item._id !== action.payload.id
      );
    },
    uploadCate(state, action) {
      state.value == action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCate.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { addCate, removeCate,uploadCate } = categoriSlice.actions;
export default categoriSlice.reducer;
