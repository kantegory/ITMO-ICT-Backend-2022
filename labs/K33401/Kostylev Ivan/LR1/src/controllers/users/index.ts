class UserController {
    get = async (request: any, response: any) => {
        response.send('Hello world!')
    }
}

export default UserController