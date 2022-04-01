import User from "../models/User"
import type { UserShape } from "../models/User"

class UserService {
  public async get(id: number): Promise<User> {
    if (id !== +id) throw new Error("User id must be an integer.")
    let user
    try {
      user = await User.findByPk(id)
    } catch (e) {
      throw new Error(`User with id=${ id } not found.`)
    }
    return user as User
  }

  public async create(userData: UserShape): Promise<User> {
    const user = await User.create(userData)
    return user
  }
}

export default UserService
