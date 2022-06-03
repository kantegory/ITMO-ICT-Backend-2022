import RestaurantService from "../../services/restaurants";


class RestaurantController {
    private restaurantService = new RestaurantService

    constructor() {
        this.restaurantService = new RestaurantService()
    }

    post = async (request: any, response: any) => {

        const { body } = request

        try {
            const restaurant = await this.restaurantService.create(body)

            response.status(201).send(restaurant)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }

    }

    getAll = async (request: any, response: any) => {
        try {
            const restaurants = await this.restaurantService.getAll()

            response.send(restaurants)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const restaurant = await this.restaurantService.getById(
                Number(request.params.id)
            )

            response.send(restaurant)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByName = async (request: any, response: any) => {
        try {
            const restaurant = await this.restaurantService.getByName(
                request.params.name
            )

            response.send(restaurant)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    ratingHigher = async (request: any, response: any) => {
        try {
            const restaurants = await this.restaurantService.ratingHigher(
                request.params.rating
            )

            response.send(restaurants)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default RestaurantController