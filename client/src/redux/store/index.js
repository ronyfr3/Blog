import {configureStore} from "@reduxjs/toolkit"
import blogReducer from "../features/blogs/blog"
import blogsReducer from "../features/blogs/blogs"
import loginUserReducer from "../features/users/loginUserSlice"

const store = configureStore({
  reducer: {
    blog: blogReducer,
    blogs: blogsReducer,
    loginUser: loginUserReducer,
  },
})
export default store
