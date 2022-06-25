import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./allUserFunc";

const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {},
    status: null,
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.status = "success";
    },
    [loginUser.rejected]: (state, action) => {
      // state.errorMessage = action;
      state.status = "failed";
    },
  },
});

export default loginUserSlice.reducer;
