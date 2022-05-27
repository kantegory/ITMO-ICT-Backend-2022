import UserService from '../services/UserService'
import {Request} from "express";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(
                +request.params.id
            )
            response.send(user)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message
            })
        }
    }

    list = async (request: any, response: any) => {
        try {
            const users = await this.userService.list()
            response.send({users: users})
        } catch (error: any) {
            response.status(404).send({
                "error": error.message
            })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const user = await this.userService.create({ email: request.body.email, password: request.body.password});
            response.send(user);
        } catch (error: any) {
            response.status(400).send({
                "error": error.message
            })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const token = await this.userService.delete(+request.params.id)
            response.send({status: 'ok'});
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const user = await this.userService.update({
                id: +request.params.id,
                ...request.body,
            })
            response.send(user);
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }
}

export default UserController
