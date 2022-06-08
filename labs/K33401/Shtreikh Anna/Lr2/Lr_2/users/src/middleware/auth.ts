import * as jwt from 'jsonwebtoken';
import UserService from "../services/userService"
let userService = new UserService()

async function authMiddleware(request: any, response: any) {
  /* const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = 'giveme678G563/';
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userService.getById(id)
      request.user = user;
      return user; */
    try {
      const accessTokenSecret = 'giveme678G563/';
      const authHeader = request.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];

        const verificationResponse = jwt.verify(token, accessTokenSecret) as DataStoredInToken
        const id = verificationResponse._id;
        console.log(token)
        const user = await userService.getById(id)
        request.user = user;
        return user
       
      }
      else {
        throw new Error(`You are not authorized`)
    }
  }
     catch (error: any) {
      throw new Error(error)
    }
  }


export default authMiddleware
