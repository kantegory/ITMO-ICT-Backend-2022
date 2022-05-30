
import UserService from "../../services/userService"
import * as bcrypt from 'bcrypt';
import authMiddleware from "../../middleware/auth"

class UserController {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    get = async (request: any, response: any) => {
        try {
            const users = await this.userService.getAll()
            return response.json(users);
        } catch (e: any) {
            response.status(404).send({ "error": e.message })
        }
    }
    post = async (request: any, response: any) => {
        try {
            const { body } = request
            const user = await this.userService.create(body);
            return response.json({ user, msg: "created" })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    getbyID = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(request.params.id)
            return response.json(user);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    getbyEmail = async (request: any, response: any) => {
        try {
            const user = await this.userService.getByEmail(request.params.email)
            return response.json(user);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    put = async (request: any, response: any) => {
        try {
            const { body } = request;
            const user = await this.userService.update(request.params.id, body)
            return response.json({ user, msg: 'Successfully update user' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const user = await this.userService.delete(request.params.id)
            return response.json({ msg: 'Successfully delete user' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    registration = async (request: any, response: any) => {
        try {
            const userData = request.body;

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.userService.create({
                ...userData,
                password: hashedPassword,
            });
            user.password = 'password';
            console.log(user)

            const tokenData = this.userService.createToken(user);
            console.log(tokenData)
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response.send(user);
        }
        catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    loggingIn = async (request: any, response: any) => {
        const logInData = request.body;
        try {
            const user = await this.userService.getByEmail(logInData.email)
                const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
                if (isPasswordMatching) {
                    user.password = 'password';
                    const tokenData = this.userService.createToken(user);
                    response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                    response.send(user);
                } else {
                    response.send({ "error": "Wrong password." })
                }
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    loggingOut = (request: any, response: any) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.status(200).send({ "massage": "You are logged out." });
      }

    showProfile = async (request: any, response: any) => {
        try {
            const user = await authMiddleware(request,response)
            return response.json(user);
        } catch (e: any) {
            response.status(404).send({ "error": e.message })
        }
    }

    createCookie(tokenData: any) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};path=/v1`;
    }
}


export default UserController