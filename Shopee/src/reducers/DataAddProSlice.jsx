import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CateAPI, { add } from "../API/Categoris";

export const getCate = createAsyncThunk("dataAddProSlice/getCate", async () => {
  const { data: categoris } = await CateAPI.getAll();
  return categoris;
});

const dataAddProSlice = createSlice({
  name: "dataAddProSlice",
  initialState: {
    value: { take1: {}, take2: {}, take3: {}, take4: {}, checkList: 3 },
  },
  reducers: {
    addTake(state, action) {
      const check = action.payload.check;
      if (check == 1) {
        state.value.take1 = action.payload.data;
      } else if (check == 2) {
        state.value.take2 = action.payload.data;
      } else if (check == 3) {
        state.value.take3 = action.payload.data;
      } else if (check == 4) {
        state.value.take4 = action.payload.data;
      }
    },
    uploadCheckList(state, action) {
      state.value.checkList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCate.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { addTake, uploadTake1, uploadCheckList } =
  dataAddProSlice.actions;
export default dataAddProSlice.reducer;
