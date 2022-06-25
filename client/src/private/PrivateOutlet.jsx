import React from "react"
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"

const PrivateOutlet = ({children}) => {
  const {userInfo} = useSelector((state) => state.loginUser)
  const auth = userInfo?.data ? true : false

  return auth ? children : <Navigate to="/" />
}

export default PrivateOutlet
