import UserService from '../../services/user/index'

export default class UserController {

    private service = new UserService()

    post = async (request: any, response: any) => {
        try {
            const user = request.body
            await this.service.add(user.nickname, user.name, user.surname, user.email, user.password)
            response.send('Added' + "'" + user.nickname + "'" + "user")
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    get = async (request: any, response: any) => {
        try {
            if (request.query.email) {
                const data = await this.service.getByEmail(request.query.email)
                response.send(data)
            } else {
                const data = await this.service.getAll()
                response.send(data)
            }
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}