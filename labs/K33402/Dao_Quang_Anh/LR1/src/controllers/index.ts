import User from "../models/index"
import { v4 as uuidv4 } from "uuid"
import UserService from "../services/user"

class Controller {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const records = await this.userService.listUsers()
            return response.json(records);
        } catch (e) {
            return response.json({ msg: 'fail to read', status: 500, route: '/read'})
        }
    }
    post = async (request: any, response: any) => {
        const id = uuidv4()
        try {
            const record = await this.userService.create({ ...request.body, id})
            return response.json({ record, msg: 'Successfully create user' })
        } catch (e) {
            return response.json({msg: "fail to create", status: 500, route: '/create'})
        }
    }
    getbyID = async (request: any, response: any) => {
        try {
            const record = await this.userService.getById( request.params.id)
            return response.json(record);
        } catch (e) {
            return response.json({ msg: 'fail to read', status: 500, route: '/user/:id'})
        }
    }
    put = async (request: any, response: any) => {
        try {
            const record = await this.userService.updateUser(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update user' })
        } catch (e) {
            return response.json({msg: "fail to update", status: 500, route: '/update'})
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const record = await this.userService.deleteUser(request.params.id)
            return response.json({msg: 'Successfully deleted user' })
        } catch (e) {
            return response.json({msg: "fail to delete", status: 500, route: '/delete'})
        }
    }
}

export default Controller
