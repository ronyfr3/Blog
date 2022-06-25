import React from "react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import moment from "moment"

const Blogs = () => {
  const {data: blogs, status} = useSelector((state) => state.blogs)

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold leading-9 text-center text-gray-800">
            Blogs
          </h1>
          <p className="text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12">
            If you're looking for great blogs, you've come to the right place.
            Create your own blog now. Click on the "create" button at the
            navigation bar.
          </p>
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap mt-10">
          {status === "loading" && <p>Loading...</p>}
          {blogs?.blog?.map((data, i) => {
            return (
              <div
                className="flex flex-col items-start justify-start relative"
                key={i}
              >
                <div className="w-full sm:w-[320px] bg-black">
                  <img
                    src={`https://picsum.photos/id/${i}/320/350`}
                    className="w-full opacity-[.7] bg-transparent"
                    alt=""
                  />
                </div>
                <div className="absolute">
                  <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                    {moment(data?.updatedAt).format("DD/MM/YYYY")}
                  </p>
                  <div className="relative top-20 p-6">
                    <h2 className="text-xl font-semibold 5 text-white">
                      {data?.title}
                    </h2>
                    <p className="text-sm leading-4 text-white my-4">
                      {data?.content?.substr(0, 35)}
                      {"..."}
                    </p>
                    <Link
                      to={`/blog/${data?._id}`}
                      className="pr-2 text-sm font-medium leading-none bg-white p-2"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Blogs
