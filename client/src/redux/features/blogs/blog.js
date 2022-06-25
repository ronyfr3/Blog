import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const blog = createAsyncThunk("blog/blog", async (id) => {
  const response = await axios.get(`/api/v1/blog/${id}`)
  return response.data
})

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: {},
    status: null,
  },
  extraReducers: {
    [blog.pending]: (state) => {
      state.status = "loading"
    },
    [blog.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = "success"
    },
    [blog.rejected]: (state) => {
      state.status = "failed"
    },
  },
})

export default blogSlice.reducer
