import Hotel from '../../models/hotel/Hotel'
import {sequelize} from '../../providers/db'

class HotelService {
    private repo = sequelize.getRepository(Hotel)

    add(name: string, town:string, capacity:number, type: string) {
        this.repo.create({name: name, town: town, capacity: capacity, type: type})
    }

    getAll(){
        return this.repo.findAll()
    }

    getById(hotel_id: number){
        return this.repo.findOne({where: {id: hotel_id}})
    }

    getWithParameters(hotel_town: string, hotel_type: string){
        const { Op } = require("sequelize")
        return this.repo.findAll({where: {town: hotel_town, type: hotel_type, capacity: {[Op.gte]: 1}}})
    }
}

export default HotelService