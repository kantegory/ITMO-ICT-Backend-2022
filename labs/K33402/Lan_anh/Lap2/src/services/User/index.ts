import express, {Request, Response } from 'express';
import db from "../../config/database.config";
import { ClientInput, ClientOuput, Client } from '../../model/User/Users';
import UserError from '../../errors/users';
class UserService {
    async create(userData: ClientInput) : Promise<Client|UserError> {
        try {
            const user = await Client.create(userData)
            return(user)
        } catch(e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }
    async getById(id: number) : Promise<ClientOuput|null> {
        const data = await Client.findByPk(id)
        return data
    }
    async getByEmail(email: string) : Promise<ClientOuput|null> {
        try {
            const data = await Client.findOne({where: { email }})
            return data
        } catch(e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }

    }
    async findAll() : Promise<ClientOuput[]> {
        return Client.findAll()
    }
    async update(id: number, userData: Partial<ClientInput>) : Promise<Client|UserError|null> {
        try {
            const data = await Client.findByPk(id)
            if (data) {
                const result = await (data as Client).update(userData)
                return result
            }
            else 
                return data
        }catch(e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }
    async delete(id: number) : Promise<boolean> {
        const deldata = await Client.destroy({
            where: {id}
        })
        return !!deldata
    }
    async checkPassword(email: string, password: string) : Promise<any>  {
        const data = await Client.findOne({where: { email, password }})
        if (!data) {
            throw new Error('Does not exist')
        }
        return { user: data, passwordMatch: true } 
    }
}   
export default UserService
