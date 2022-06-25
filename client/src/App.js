import Layout from "./components/Layout"
import Blogs from "./components/Blogs"
import Blog from "./page/Blog"
import Register from "./auth/Register"
import Login from "./auth/Login"
import {Routes, Route} from "react-router-dom"
import PrivateOutlet from "./private/PrivateOutlet"

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/blogs"
          element={
            <PrivateOutlet>
              <Blogs />
            </PrivateOutlet>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PrivateOutlet>
              <Blog />
            </PrivateOutlet>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
