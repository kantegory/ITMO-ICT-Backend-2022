import Property from "../../models/Airbnb/Property";
import PropertyError from "../../errors/Airbnb/PropertyError";
import { Op } from "sequelize"
class PropertyService {
    async create(propertyData: any) {
        const property = await Property.create(propertyData)
        if (property == null)
            throw new PropertyError("Invalid data")

        return property.toJSON()
    }

    async getById(id: number) {
        const property = await Property.findByPk(id)
        if (property == null) {
            throw new PropertyError("Not found")
        }
        return property.toJSON()
    }

    async getAll() {
        return await Property.findAll()
    }

    async getByFilter(filterBody: any) {
        let whereOptions: any = {}

        if (filterBody.maxPrice) {
            whereOptions.pricePerDay = {
                [Op.lte]: filterBody.maxPrice
            }
        }
        if (filterBody.city) {
            whereOptions.city = filterBody.city
        }
        if (filterBody.guestCount) {
            whereOptions.maxGuestCount = {
                [Op.gte]: filterBody.guestCount
            }
        }

        return await Property.findAll({ where: whereOptions })
    }

    async update(propertyData: any) {
        await Property.update(propertyData, { where: { id: propertyData.id } })
        return this.getById(propertyData.id)
    }

    async delete(id: number) {
        const property = await Property.findByPk(id)
        if (property == null)
            throw new PropertyError("Not found")
        property.destroy()
    }
}

export default PropertyService