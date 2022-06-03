import Restaurant from "../../models/restaurant/restaurant";
import MyError from "../../errors";
import {Op} from "sequelize";

class RestaurantService {

    async create(userData: any) {
        try {
            const restaurant = await Restaurant.create(userData)

            return restaurant.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new MyError(errors)
        }
    }

    async getAll() {
        const restaurants = await Restaurant.findAll()

        if (restaurants) return restaurants

        throw new MyError('Restaurants are not found')
    }

    async getById(id: number) {
        const restaurant = await Restaurant.findByPk(id)

        if (restaurant) return restaurant.toJSON()

        throw new MyError('Restaurant with this id not found')
    }

    async getByName(name: string) {
        const restaurant = await Restaurant.findOne({
            where: {
                name: name
            }
        })

        if (restaurant) return restaurant.toJSON()

        throw new MyError('Restaurant with this name not found')
    }

    async ratingHigher(rating: number) {
        const restaurants = await Restaurant.findAll({
            where: {
                rating: {
                    [Op.gte]: 5
                }
            }
        })

        if (restaurants) return restaurants

        throw new MyError('Restaurant with rating higher than that not found')
    }
}

export default RestaurantService