import User from "../models/index"
import { v4 as uuidv4 } from "uuid"
import UserService from "../services/user"
import router from "../routes/index"

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const records = await this.userService.listUsers()
            return response.json(records);
        } catch (error) {
            response.status(404).send({ "error": 404 })
        }
    }
    post = async (request: any, response: any) => {
        const id = uuidv4()
        console.log(request)
        try {
            const record = await this.userService.create({ ...request.body, id})
            return response.json({ record, msg: 'Successfully create user' })
        } catch (error) {
            response.status(400).send({ "error": 404 })
        }
    }
    getbyID = async (request: any, response: any) => {
        try {
            const record = await this.userService.getById(request.params.id)
            return response.json(record);
        } catch (error) {
            response.status(404).send({ "error": 404 })
        }
    }
    put = async (request: any, response: any) => {
        try {
            const record = await this.userService.updateUser(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update user' })
        } catch (error) {
            response.status(404).send({ "error": 404 })
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const record = await this.userService.deleteUser(request.params.id)
            return response.json({msg: 'Successfully delete user' })
        } catch (error) {
            response.status(404).send({ "error": 404 })
        }
    }
}

export default UserController