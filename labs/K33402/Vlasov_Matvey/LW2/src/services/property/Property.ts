import dataSource from '../../providers/db'
import Property from '../../models/property/Property'
import { UpdateResult, DeleteResult } from 'typeorm'

class PropertyService {
    repository = dataSource.getRepository(Property);

    async create(propertyData: object) : Promise<Property> {
        try {
            const entity = Object.assign(new Property(), propertyData)
            const property = await this.repository.save(entity)
            return property
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async get(id: number) : Promise<Property> {
        const property = await this.repository.findOneBy({ 'id': id })

        if (property) return property

        throw new Error(`Property with id ${id} not found`)
    }

    async update(id: number, propertyData: object) : Promise<UpdateResult> {
        try {
            const entity = Object.assign(new Property(), propertyData)
            return await this.repository.update({ 'id' : id }, entity)
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number) : Promise<DeleteResult> {
        try {
            return await this.repository.delete({ 'id' : id })
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async getList() : Promise<Property[]> {
        return await this.repository.find()
    }
}

export default PropertyService