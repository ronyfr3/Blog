import {createSlice} from "@reduxjs/toolkit"
import {registerUser} from "./allUserFunc"

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState: {
    userInfo: {},
    status: null,
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "loading"
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload
      state.status = "success"
    },
    [registerUser.rejected]: (state) => {
      state.status = "failed"
    },
  },
})

export default registerUserSlice.reducer
