import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SaveOrderAPI from "../API/SaveOrder";
import SliderAPI from "./../API/Slider";

export const getSlider = createAsyncThunk("slider/getSlider", async () => {
  const { data: slides } = await SliderAPI.getAll();
  return slides;
});

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: [],
  },
  reducers: {
    addSlide(state, action) {
      state.value.push(action.payload);
    },
    uploadSlide(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSlider.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { addSlide, uploadSlide } = sliderSlice.actions;
export default sliderSlice.reducer;
