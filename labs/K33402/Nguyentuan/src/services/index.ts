import express, {Request, Response } from 'express';
import db from "../config/database.config";
import { TodoInput, TodoOuput, TodoInstance } from '../model';
import UserError from '../errors/users';
class UserService {
    async create(userData: TodoInput) : Promise<TodoInstance|UserError> {
        try {
            const user = await TodoInstance.create(userData)
            return(user)
        } catch(e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }
    async getById(id: number) : Promise<TodoOuput|null> {
        const data = await TodoInstance.findByPk(id)
        return data
    }
    async findAll() : Promise<TodoOuput[]> {
        return TodoInstance.findAll()
    }
    async update(id: number, userData: Partial<TodoInput>) : Promise<TodoInstance|UserError|null> {
        try {
            const data = await TodoInstance.findByPk(id)
            if (data) {
                const result = await (data as TodoInstance).update(userData)
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
        const deldata = await TodoInstance.destroy({
            where: {id}
        })
        return !!deldata
    }
}   
export default UserService
