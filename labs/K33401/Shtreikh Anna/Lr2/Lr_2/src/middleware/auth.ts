import * as jwt from 'jsonwebtoken';
import UserService from "../services/userService"
let userService = new UserService()

async function authMiddleware(request: any, response: any) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = 'giveme678G563/';
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userService.getById(id)
      request.user = user;
      return user;

    } catch (error: any) {
      throw new Error(error)
    }
  } else {
    throw new Error(`You are not authorized.`)
  }
}

export default authMiddleware;
