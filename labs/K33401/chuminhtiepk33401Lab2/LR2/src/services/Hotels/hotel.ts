import express, {Request, Response } from 'express';
import db from "../../config/database.config";
import { HotelInput, HotelOuput, Hotel } from '../../model/Hotel/Hotel';
import UserError from '../../errors/users';
class HotelService {
    async create(userData: HotelInput) : Promise<Hotel|UserError> {
        try {
            const user = await Hotel.create(userData)
            return(user)
        } catch(e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }
    async getbyname(Name: string) : Promise<Hotel|null> {
        const data = await Hotel.findOne({ where: {Name}})
        return data
    }
    async findAll() : Promise<HotelOuput[]> {
        return Hotel.findAll()
    }
    async update(id: number, userData: Partial<HotelInput>) : Promise<Hotel|UserError|null> {
        try {
            const data = await Hotel.findByPk(id)
            if (data) {
                const result = await (data as Hotel).update(userData)
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
        const deldata = await Hotel.destroy({
            where: {id}
        })
        return !!deldata
    }
}   
export default HotelService
