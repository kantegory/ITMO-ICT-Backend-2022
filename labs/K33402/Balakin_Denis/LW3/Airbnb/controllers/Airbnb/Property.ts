import Property from "../../models/Airbnb/Property";
import PropertyError from "../../errors/Airbnb/PropertyError";
import PropertyService from "../../services/Airbnb/Property";

class PropertyController {
    private propertyController = new PropertyService
    
    get = async (request: any, response: any) => {
        const { body } = request
        try {
            const props = await this.propertyController.getByFilter(body)
            response.send(props)
        }
        catch (err) {
            response.status(500).send((err as Error).message)
        }
    }

    getById = async (request: any, response: any) => {
        try {
            response.send(await this.propertyController.getById(request.params.id))
        }
        catch (err) {
            response.sendStatus(404)
        }
    }

    create = async (request: any, response: any) => {
        try {
            response.status(201).send(await this.propertyController.create(request.body))
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

    update = async (request: any, response: any) => {
        try {
            await this.propertyController.update(request.body)
            response.sendStatus(204)
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.propertyController.delete(request.params.id)
            response.sendStatus(204)
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

}

export default PropertyController