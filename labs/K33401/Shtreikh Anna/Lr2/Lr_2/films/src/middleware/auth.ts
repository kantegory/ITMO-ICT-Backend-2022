import * as jwt from 'jsonwebtoken';

import fetch from 'node-fetch'

async function authMiddleware(request: any, response: any) {
    try {
      const accessTokenSecret = 'giveme678G563/';
      const authHeader = request.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1]
        const verificationResponse = jwt.verify(token, accessTokenSecret) as DataStoredInToken
        const id = verificationResponse._id;
        console.log(token)
        const curUser = `http://localhost:8333/v1/users/id/${id}`
        let resp = await fetch(curUser)
        let user = await resp.json()
        request.user = user;
        return user
       
      }
      else {
        throw new Error(`You are not authoried`)
    }
  }
     catch (error: any) {
      throw new Error(error)
    }
  }


export default authMiddleware
