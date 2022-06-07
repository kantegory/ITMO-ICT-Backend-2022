import AuthService from '../services/index'

class AuthController {
    private service = new AuthService()

    post = async (request: any, response: any) => {
        try{
            const user = request.body
            await this.service.add(user.name, user.surname, user.email, user.age)
            response.send('Successfully added user')
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }
}

export default AuthController