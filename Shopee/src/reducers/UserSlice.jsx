import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadInfoUser, getInfoUser, uploadPassword, uploadEmail } from "../API/Users";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id) => {
    const { data: user } = await getInfoUser(id);
    return user;
  }
);

export const uploadUser = createAsyncThunk(
  "users/uploadUser",
  async (data) => {
    const { data: user } = await uploadInfoUser(data);
    console.log(user, 'chào nehs')
    return user;
  }
);
export const checkUploadPassword = createAsyncThunk(
  "users/checkUploadPassword",
  async (data) => {
    console.log(data, 'data rồi nhé')
    const { data: user } = await uploadPassword(data);
    console.log(user, 'chào nehs')
    return user;
  }
);
export const uploadEmailUser = createAsyncThunk(
  "users/uploadEmailUser",
  async (data) => {
    console.log(data, 'data rồi nhé')
    const { data: user } = await uploadEmail(data);
    console.log(user, 'chào nehs')
    return user;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    value: [],
    password: {},
    email:null,
    loading: true
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });

    builder.addCase(uploadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(checkUploadPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.password = action.payload;
    });
    builder.addCase(uploadEmailUser.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload;
    });
  },
});
export default userSlice.reducer;
