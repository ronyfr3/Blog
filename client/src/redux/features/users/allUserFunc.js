import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
//toast
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

export const registerUser = createAsyncThunk(
  "registerUser/registerUser",
  async (user) => {
    await axios
      .post(`/api/v1/user/register`, user)
      .then((res) => {
        if (res.data) window.location.href = "/"
        return res.data
      })
      .catch((error) =>
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      )
  }
)

export const loginUser = createAsyncThunk(
  "loginUser/loginUser",
  async (user) => {
    const {data} = await axios.post(`/api/v1/user/login`, user)
    localStorage.setItem("userInfo", JSON.stringify(data))
    if (data) window.location.href = "/blogs"
    return data
  }
)

export const logoutUser = createAsyncThunk("logoutUser/logoutUser", () => {
  localStorage.removeItem("userInfo")
  window.location.href = "/blogs"
})
