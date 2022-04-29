import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { StrictMode, useEffect, useState } from "react"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import type { UserShape } from "./models/shapes"
import NewPost from "./pages/NewPost"
import { css } from "@emotion/react"
import { api } from "./util/frontend"

const Root = () => {
  const [user, setUser] = useState<UserShape>({ username: "", password: ""})
  const navigate = useNavigate()
  useEffect(() => {
    api("/user/whoami")
      .then(user => setUser({ username: user.username, password: "" }))
  }, [])
  const saveJwt = (jwt: string, jwtExpires: string) => {
    document.cookie = `jwt=${ jwt };expires=${ jwtExpires }`
    navigate("/")
  }
  return (
      <Routes>
        <Route path="/" element={ <Home username={ user.username } setUser={ setUser } /> } />
        <Route path="/auth" element={
          <Auth
            user={ user }
            onChange={ setUser }
            onSuccess={ saveJwt } />
        } />
        <Route path="/newPost" element={ <NewPost /> } />
      </Routes>
  )
}

const App = () => {
  return (
    <StrictMode>
      <div css={ css`
        width: 60%;
        min-height: 90vh;
        margin: 0 auto;
        background-color: lightcyan;
        padding: 2em;
      ` }>
        <Router>
          <Root />
        </Router>
      </div>
    </StrictMode>
  )
}

const e = <App />

export default e
