import HotelService from "../../services/hotel"

class HotelController {
    private service = new HotelService()

    get = async (request: any, response: any) => {
        try{
            if(request.query.town) {
                const data = await this.service.getWithParameters(request.query.town, request.query.type)
                response.send(data)
            } else {
                const data = await this.service.getAll()
                response.send(data)
            }
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }

    post = async (request: any, response: any) => {
        try{
            const hotel = request.body
            await this.service.add(hotel.name, hotel.town, hotel.capacity, hotel.type)
            response.send('Successfully added hotel')
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }
}

export default HotelController