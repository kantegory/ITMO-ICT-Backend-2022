import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User"
import type { UserShape } from "../models/User"
import type { JwtResponse } from "../models/shapes"

class UserService {
  public get(id: number): Promise<User> {
    if (id !== +id) throw new Error("User id must be an integer.")
    const user = User.findByPk(id)
      .catch(e => { throw new Error(`User with id=${ id } not found.`) })
    return user as Promise<User>
  }

  public create(userData: UserShape): Promise<User> {
    return User.create(userData)
  }

  public getJwt(id: number): JwtResponse {
    const jwt = jsonwebtoken.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' })
    const jwtExpires = new Date()
    jwtExpires.setDate(jwtExpires.getDate() + 30)
    return { jwt, jwtExpires }
  }

  public auth({ username, password }: UserShape): Promise<JwtResponse> {
    const jwt = User.findOne({ where: { username } })
      .then(user => {
        if (!user) throw new Error(`User ${ username } not found.`)
        const verified = bcrypt.compareSync(password, user.password)
        if (verified) {
          return this.getJwt(user.id)
        } else {
          throw new Error(`Passwords don't match for user ${ username }.`)
        }
      })
      .catch(e => { throw new Error(`User ${ username } not found.`) })
    return jwt
  }
}

export default UserService
