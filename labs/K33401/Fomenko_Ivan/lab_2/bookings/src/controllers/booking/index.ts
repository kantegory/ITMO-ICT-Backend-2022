import BookingService from "../../services/booking"
import UserService from "../../services/user"

class BookingController {
    private service = new BookingService()
    private service2 = new UserService()

    get = async (request: any, response: any) => {
        try{
            const data = await this.service.getBookings(request.user.id)
            response.send(data)
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }

    post = async (request: any, response: any) => {
        try{
            const booking = request.body
            booking.userId = request.user.id
            const usero = await this.service2.getById(booking.userId)
            if(usero && usero.age > 17){
                await this.service.add(booking.arrival, booking.departure, booking.visitors, booking.userId, booking.hotelId)
                response.send('Successfully added user')
            } else {
                response.status(400).send('Too young for that')
            }
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }
}

export default BookingController