import React, {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {logoutUser} from "../redux/features/users/allUserFunc"
import ReactDom from "react-dom"
import {Link} from "react-router-dom"
import axios from "axios"
//toast
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

const Header = () => {
  let dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const {userInfo} = useSelector((state) => state.loginUser)

  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <div className="flex items-center justify-between px-10 shadow h-16">
      <div className="flex items-center justify-center">
        <img
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg3.svg"
          alt="logo"
        />
        <Link
          to={userInfo?.data?.email ? "/blogs" : "/"}
          className="text-base text-gray-700 font-bold leading-normal px-3"
        >
          CodingTest
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="w-full flex justify-center py-12">
          {userInfo?.data?.email ? (
            <button
              className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
              onClick={() => setOpenModal(true)}
            >
              Create
            </button>
          ) : (
            <Link
              to="/"
              className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
            >
              Create
            </Link>
          )}
        </div>
        {openModal && <Modal setOpenModal={setOpenModal} userInfo={userInfo} />}
        {userInfo?.data?.email && (
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm semibold">{userInfo?.data?.name}</p>
            <button
              onClick={logout}
              className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

function Modal({setOpenModal, userInfo}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async () => {
    try {
      const {data} = await axios.post("/api/v1/blog", {
        user: {
          name: userInfo?.data?.name,
          profession: userInfo?.data?.profession,
        },
        title,
        content,
      })
      if (data) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        toast.error("Blog not created!", {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  return ReactDom.createPortal(
    <>
      <div className="backdrop" />
      <div className="overlay flex w-[90%] flex-col md:w-[500px]">
        <div className="flex flex-col md:mr-16 my-2">
          <label
            htmlFor="Title"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Title
          </label>
          <textarea
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="title"
          />
        </div>
        <div className="flex flex-col md:mr-16 my-2">
          <label
            htmlFor="Content"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            onChange={(e) => setContent(e.target.value)}
            className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Description.."
          />
        </div>

        <div className="flex items-center justify-start w-full mt-3">
          <button
            onClick={handleSubmit}
            className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Submit
          </button>
          <button
            className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
        <div
          className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
          onClick={() => setOpenModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Close"
            className="icon icon-tabler icon-tabler-x"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </div>
      </div>
      <div className="w-full flex justify-center py-12">
        <button
          className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
          onClick={() => setOpenModal(true)}
        >
          Create
        </button>
      </div>
    </>,
    document.getElementById("portal")
  )
}
