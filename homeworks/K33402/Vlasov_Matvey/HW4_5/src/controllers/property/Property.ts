import { UpdateResult, DeleteResult } from 'typeorm'
import Property from '../../models/property/Property'
import PropertyService from '../../services/property/Property'

class PropertyController {
    private propertyService: PropertyService

    constructor() {
        this.propertyService = new PropertyService()
    }

    private sendError(response: any, error: any) {
        let statusCode = 400
        if (error.message.includes('not found')) statusCode = 404
        response.status(statusCode).send({ "error": error.message })
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: Property | Error = await this.propertyService.create(body)

            response.status(201).send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    retrieve = async (request: any, response: any) => {
        try {
            const res: Property | Error = await this.propertyService.get(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: UpdateResult | Error = await this.propertyService.update(Number(request.params.id), body)

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const res: DeleteResult | Error = await this.propertyService.delete(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    getList = async (request: any, response: any) => {
        try {
            const res: Property[] | Error = await this.propertyService.getList()

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }
}

export default PropertyController