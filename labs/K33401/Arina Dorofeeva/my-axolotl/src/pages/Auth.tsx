import { css } from "@emotion/react"
import { useState } from "react"
import { JwtResponse } from "../controllers/UserController"
import { UserShape } from "../models/User"
import { api } from "../util/frontend"

type RealJwtResponse = Omit<JwtResponse, "jwtExpires"> & { jwtExpires: string }

const Auth = ({
  user,
  onChange,
  onSuccess
}: {
  user: UserShape,
  onChange: (user: UserShape) => void,
  onSuccess: (jwt: string, jwtExpires: string) => void
}) => {
  const [error, setError] = useState("")
  const signup = () => {
    setError("")
    api("/user", {
      method: "POST",
      body: { user }
    })
      .then((r: RealJwtResponse) => {
        onSuccess(r.jwt, r.jwtExpires)
      })
      .catch(e => setError(e.message))
  }
  const login = () => {
    setError("")
    api("/user/auth", {
      method: "POST",
      body: { user }
    })
      .then((r: RealJwtResponse) => {
        onSuccess(r.jwt, r.jwtExpires)
      })
      .catch(e => setError(e.message))
  }
  return (
    <div css={ css`
      display: flex;
      flex-direction: column;
      align-items: center;
    ` }>
      {
        error &&
        <div css={ css`
          background-color: red;
        ` }>
          { error }
        </div>
      }
      <input
        type="text"
        placeholder="Login"
        value={ user.username } 
        onChange={ (e) => onChange({...user, username: e.target.value } as UserShape) }
      />
      <input
        type="password"
        placeholder="Password"
        value={ user.password }
        onChange={ (e) => onChange({...user, password: e.target.value } as UserShape) }
      />
      <div css={ css`
        display: flex;
        justify-content: space-between;
      ` }>
        <button onClick={ login }>
          Login
        </button>
        <button onClick={ signup }>
          Sign up
        </button>
      </div>
    </div>
  )
}

export default Auth
