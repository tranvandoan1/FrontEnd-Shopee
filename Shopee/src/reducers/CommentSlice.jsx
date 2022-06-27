import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { async } from "@firebase/util";
import CommentAPI, { add, upload } from "./../API/CommentAPI";
import { remove } from "./../API/Categoris";

export const getAllComment = createAsyncThunk(
  "comment/getAllComment",
  async () => {
    const { data: comments } = await CommentAPI.getAll();
    return comments;
  }
);

export const addComments = createAsyncThunk(
  "comment/addComments",
  async (data) => {
    const { data: comments } = await add(data);
    return comments;
  }
);
export const uploadtComments = createAsyncThunk(
  "comment/uploadtComments",
  async (data) => {
    console.log(data)
    const { data: comments } = await upload(data.id, data.dataUploat);
    return comments;
  }
);
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    value: [],
  },
  reducers: {
    addComment(state, action) {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    removeComment(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadtComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { removeComment, addComment } = commentSlice.actions;
export default commentSlice.reducer;
