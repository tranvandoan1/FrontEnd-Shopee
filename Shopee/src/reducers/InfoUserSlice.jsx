import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, remove, upload } from "../API/InFoUser";
import InfoUserAPI from "./../API/InFoUser";
async function getAll() {
  const { data: info_user } = await InfoUserAPI.getAll();
  const user = JSON.parse(localStorage.getItem("user"));
  const dataProducts = info_user?.filter((item) => item.user_id == user._id)
  return dataProducts;
}
export const getInfoUser = createAsyncThunk(
  "infouser/getInfoUser",
  async () => {
    await InfoUserAPI.getAll();
    return getAll();
  }
);
export const addInfoUser = createAsyncThunk(
  "infouser/addInfoUser",
  async (data) => {
    await add(data);
    return getAll();
  }
);
export const removeInfoUser = createAsyncThunk(
  "infouser/removeInfoUser",
  async (id) => {
    await remove(id);
    return getAll();
  }
);
export const uploadInfoUser = createAsyncThunk(
  "infouser/uploadInfoUser",
  async (data) => {
    console.log(data,'132eqw')
    await upload(data);
    return getAll();
  }
);

const infoUserSlice = createSlice({
  name: "infoUuser",
  initialState: {
    value: [],
    loading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getInfoUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getInfoUser.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(addInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(uploadInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
  },
});
export default infoUserSlice.reducer;
