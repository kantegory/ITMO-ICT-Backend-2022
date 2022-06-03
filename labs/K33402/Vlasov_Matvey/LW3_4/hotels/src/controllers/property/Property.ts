import { UpdateResult, DeleteResult } from 'typeorm'
import Property from '../../models/property/Property'
import PropertyService from '../../services/property/Property'

class PropertyController {
    private propertyService: PropertyService

    constructor() {
        this.propertyService = new PropertyService()
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: Property | Error = await this.propertyService.create(body)

            response.status(201).send(res)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    retrieve = async (request: any, response: any) => {
        try {
            const res: Property | Error = await this.propertyService.get(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: UpdateResult | Error = await this.propertyService.update(Number(request.params.id), body)

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const res: DeleteResult | Error = await this.propertyService.delete(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getList = async (request: any, response: any) => {
        try {
            const res: Property[] | Error = await this.propertyService.getList()

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default PropertyController