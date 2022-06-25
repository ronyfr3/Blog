import React from "react"
import {loginUser} from "../redux/features/users/allUserFunc"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"

const Login = () => {
  const dispatch = useDispatch()

  const {status} = useSelector((state) => state.loginUser)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email field required")
        .matches(
          //eslint-disable-next-line
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Invalid email format"
        ),
      password: Yup.string().required("Password field required"),
    }),
    onSubmit: (values, {resetForm}) => {
      dispatch(loginUser(values))
      resetForm()
    },
  })
  return (
    <div className="flex w-full items-center justify-center px-6 py-16">
      <form
        className="w-full sm:w-[400px] rounded-lg bg-white shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <div className="my-3 flex flex-col items-center justify-center ">
          <p className="text-gray-600 text-center text-2xl font-bold">
            Sign In
          </p>
        </div>
        <div className="px-12 pb-10">
          <div className="mb-4 w-full">
            <p className="mb-2 text-center text-sm text-red-500">
              {status === "failed" ? "Wrong email or password." : ""}
            </p>
            <div className="flex items-center">
              <i className="fas fa-user absolute z-10 ml-3 text-xs text-gray-500"></i>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                className="w-full rounded border border-gray-500 py-2 px-2 text-gray-700 placeholder-gray-500 focus:border-gray-500 focus:ring-0"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <small className="pt-1 text-red-500">{formik.errors.email}</small>
            )}
          </div>
          <div className="mb-1 w-full">
            <div className="relative flex items-center justify-start">
              <i className="fas fa-lock absolute z-10 ml-3 text-xs text-gray-500"></i>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                className="w-full rounded border border-gray-500 py-2 px-2 text-gray-700 placeholder-gray-500 focus:border-gray-500 focus:ring-0"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <small className="pt-1 text-red-500">
                {formik.errors.password}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-700 mt-3 w-full rounded-full py-2 text-gray-100  focus:outline-none"
          >
            Login
          </button>
          <p className="mt-4 w-full text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="ml-2 text-sm text-gray-500 underline"
            >
              Register now
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
