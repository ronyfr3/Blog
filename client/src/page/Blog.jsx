import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {blog} from "../redux/features/blogs/blog"
import moment from "moment"
import axios from "axios"
//toast
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Blog = () => {
  const {userInfo} = useSelector((state) => state.loginUser)

  let {id} = useParams()
  let dispatch = useDispatch()
  const {data} = useSelector((state) => state.blog)
  const [comment, setComment] = useState("")
  const [openComent, setOpenComment] = useState(false)

  const submitComment = async () => {
    try {
      const {data} = await axios.post(`/api/v1/blog/review/${id}`, {
        user: {
          name: userInfo?.data?.name,
          profession: userInfo?.data?.profession,
        },
        comment,
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
  const updateVote = async () => {
    try {
      const {data} = await axios.post(`/api/v1/blog/updateVote/${id}`)
      if (data) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        toast.error("Something Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  const downGradeVote = async () => {
    try {
      const {data} = await axios.post(`/api/v1/blog/downGradeVote/${id}`)
      if (data) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        toast.error("Something wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  useEffect(() => {
    dispatch(blog(id))
  }, [dispatch, id])
  // console.log(data)
  return (
    <div className="p-6 border my-10 sm:w-[60%] mx-auto">
      <p className="text-base text-indigo-600 font-bold">{data?.user?.name}</p>
      <div className="flex gap-2 items-center">
        <p className="text-sm text-indigo-400 font-semibold">
          {data?.user?.profession}
        </p>
        <p className="text-sm text-indigo-400 font-semibold">
          {moment(data?.updatedAt).format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="my-5">
        <h1>{data?.title}</h1>
        <p>{data?.content}</p>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <button
          onClick={updateVote}
          className="px-4 py-1 bg-green-600 text-white rounded"
        >
          upVote {data?.upVote}
        </button>
        <button
          onClick={downGradeVote}
          className="px-4 py-1 bg-red-600 text-white rounded"
        >
          downVote {data?.downVote}
        </button>
        <button
          onClick={() => setOpenComment(!openComent)}
          className="px-4 py-1 bg-indigo-500 text-white rounded"
        >
          Comment {data?.reviews?.length}
        </button>
      </div>
      {/* comment section */}
      {openComent && (
        <div>
          <div className="flex items-center gap-1 mt-5">
            <textarea
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
              placeholder="Write your comment"
            />
            <button
              onClick={submitComment}
              className="px-4 py-2 bg-slate-500 text-white rounded"
            >
              Submit
            </button>
          </div>

          <div className="mt-5">
            <h1 className="text-lg text-indigo-700 font-semibold">
              Comments: {data?.reviews?.length}
            </h1>
            {data?.reviews?.map((data) => {
              return (
                <>
                  <div className="flex gap-2 items-center justify-start mt-4">
                    <p className="text-base text-gray-700 font-semibold">
                      {data?.user?.name}
                    </p>
                    <p className="text-sm text-gray-700 font-semibold">
                      {moment(data?.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{data?.comment}</p>
                </>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
