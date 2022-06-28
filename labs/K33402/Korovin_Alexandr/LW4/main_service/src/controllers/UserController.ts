import axios from "axios"
import { config } from "../config/config";

class UserController {
    private async requestProxy(url: string, method: any, expressResponse: any, body: any = null) {
        axios({
            method: method,
            url: `http://${config.auth_service.host}:${config.auth_service.port}${url}`,
            data: body
        }).then((res) =>{
            expressResponse.status(res.status).send(res.data)
        }).catch((error) => {
            expressResponse.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : {"error": error.message})
        })
    }

    register = async (request: any, response: any) => {
        const {body} = request
        
        await this.requestProxy('/users/register', 'post', response, body)
    }

    
    get = async (request: any, response: any) => {
        const {user} = request
        if (user) {
            await this.requestProxy(`/users/get/${user.id}`, 'get', response)
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }
    getList = async (request: any, response: any) => {
        const {users} = request
        if (users) {
            await this.requestProxy(`/users/get/`, 'get', response)
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }
    
    update = async (request: any, response: any) => {
        const {body, user} = request
        if (user) {
            await this.requestProxy(`/users/update/${user.id}`, 'patch', response, body)
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    login = async (request: any, response: any) => {
        const {body} = request
        await this.requestProxy('/users/login', 'post', response, body)
    }

    delete = async (request: any, response: any) => {
        const {body, user} = request
        await this.requestProxy(`/users/delete/${user.id}`, 'delete', response, body)
    }
}

export default UserController