import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, remove, upload } from "../API/InFoUser";
import InfoUserAPI from "./../API/InFoUser";

export const getInfoUser = createAsyncThunk(
  "infouser/getInfoUser",
  async () => {
    const { data: info_user } = await InfoUserAPI.getAll();

    return info_user;
  }
);
export const addInfoUser = createAsyncThunk(
  "infouser/addInfoUser",
  async (data) => {
    const { data: info_user } = await add(data);
    return info_user;
  }
);
export const removeInfoUser = createAsyncThunk(
  "infouser/removeInfoUser",
  async (id) => {
    const { data: info_user } = await remove(id);
    return info_user;
  }
);
export const uploadInfoUser = createAsyncThunk(
  "infouser/uploadInfoUser",
  async (data) => {
    await upload(data.id, data.data);
    const { data: info_user } = await upload(data.idUpload, data.dataUpload);
    console.log(info_user);
    return info_user;
  }
);

const infoUserSlice = createSlice({
  name: "infoUuser",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeInfoUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addInfoUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadInfoUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default infoUserSlice.reducer;
