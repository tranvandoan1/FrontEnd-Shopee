import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SliderAPI, { add, upload } from "./../API/Slider";
async function getAll() {
  const { data: slides } = await SliderAPI.getAll();
  return slides
}
export const getSlider = createAsyncThunk("slider/getSlider", async (data) => {
  console.log(data,'e2qwds')
  return getAll();
});

export const uploadSliders = createAsyncThunk("slider/uploadSliders", async (data) => {
  // return getAll();
  console.log(data,'e2qwds')
  await upload(data);
  console.log('đâsdasdasd')
  return getAll();
});
export const addSlider = createAsyncThunk("slider/addSlider", async (data) => {
  await add(data);
  return getAll();
});

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getSlider.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadSliders.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addSlider.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default sliderSlice.reducer;
