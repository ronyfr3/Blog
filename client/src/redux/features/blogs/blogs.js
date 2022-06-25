import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const blogs = createAsyncThunk("blogs/blogs", async () => {
  const response = await axios.get("/api/v1/blog")
  return response.data
})

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [blogs.pending]: (state) => {
      state.status = "loading"
    },
    [blogs.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = "success"
    },
    [blogs.rejected]: (state) => {
      state.status = "failed"
    },
  },
})

export default blogsSlice.reducer
