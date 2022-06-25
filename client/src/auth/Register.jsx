import React from "react"
import {useDispatch} from "react-redux"
import {registerUser} from "../redux/features/users/allUserFunc"
import {useFormik} from "formik"
import * as Yup from "yup"

const Register = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name field required"),
      profession: Yup.string().required("Profession field required"),
      email: Yup.string()
        .required("Email field required")
        .matches(
          //eslint-disable-next-line
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Invalid email format"
        ),
      password: Yup.string().required("Password field required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values, {resetForm}) => {
      dispatch(registerUser(values))
      resetForm()
    },
  })
  return (
    <div className="flex w-full items-center justify-center px-6 py-16">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full sm:w-[400px] rounded-lg bg-white shadow-md"
      >
        <div className="my-5 flex flex-col items-center justify-center ">
          <p className="text-center text-2xl font-bold text-gray-600">
            Register
          </p>
        </div>
        <div className="px-12 pb-10">
          <div className="mb-4 w-full">
            <div className="flex items-center">
              <i className="fas fa-user absolute z-10 ml-3 text-xs text-gray-500"></i>
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full rounded border border-gray-500 py-2 px-2 text-gray-700 placeholder-gray-500 focus:border-gray-500 focus:ring-0"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <small className="pt-1 text-red-500">{formik.errors.name}</small>
            )}
          </div>
          <div className="mb-4 w-full">
            <div className="flex items-center">
              <i className="fas fa-user absolute z-10 ml-3 text-xs text-gray-500"></i>
              <input
                type="text"
                placeholder="profession"
                name="profession"
                value={formik.values.profession}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full rounded border border-gray-500 py-2 px-2 text-gray-700 placeholder-gray-500 focus:border-gray-500 focus:ring-0"
              />
            </div>
            {formik.touched.profession && formik.errors.profession && (
              <small className="pt-1 text-red-500">
                {formik.errors.profession}
              </small>
            )}
          </div>
          {/* email */}
          <div className="mb-4 w-full">
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
          {/* password */}
          <div className="mb-4 w-full">
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
          {/* confirm Password */}
          <div className="mb-4 w-full">
            <div className="relative flex items-center justify-start">
              <i className="fas fa-lock absolute z-10 ml-3 text-xs text-gray-500"></i>
              <input
                type="password"
                name="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm password"
                className="w-full rounded border border-gray-500 py-2 px-2 text-gray-700 placeholder-gray-500 focus:border-gray-500 focus:ring-0"
              />
            </div>
            {formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation && (
                <small className="pt-1 text-red-500">
                  {formik.errors.passwordConfirmation}
                </small>
              )}
          </div>
          <button
            type="submit"
            className="bg-indigo-700 w-full rounded-full py-2 text-gray-100  focus:outline-none"
          >
            Register
          </button>
          <p className="mt-4 w-full text-center text-sm text-gray-500">
            Already have an account?
            <a href="/" className="ml-2 text-sm text-gray-500 underline">
              Login now
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
