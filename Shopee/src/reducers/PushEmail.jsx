import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const pushEmail = createAsyncThunk(
  "email/pushEmail",
  async (data) => {
    console.log(data, 'test data')
    const { data: email } = await pushOtpEmail(data);
    console.log(email, 'useruser21')
    return email;
  }
);

const pushEmailSlice = createSlice({
  name: "email",
  initialState: {
    value: undefined,
    loading: true
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(pushEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
  },
});
export default pushEmailSlice.reducer;
