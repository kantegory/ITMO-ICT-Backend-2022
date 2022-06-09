import UserService from '../../services/user/index'

class UserController {
    private service = new UserService()

    get = async (request: any, response: any) => {
        try{
            if(request.query.email) {
                console.log(`Searching user ${request.query.email}`)
                const data = await this.service.getByEmail(request.query.email)
                response.send(data)
            } else {
                const data = await this.service.getAll()
                response.send(data)
            }
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }

    post = async (request: any, response: any) => {
        try{
            const user = request.body
            await this.service.add(user.name, user.surname, user.email, user.password, user.age)
            response.send('Successfully added user')
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }
}

export default UserController