import BookingService from "../../services/booking"
import UserService from "../../services/user"
import HotelService from "../../services/hotel"

class BookingController {
    private bookingService = new BookingService()
    private userService = new UserService()
    private hotelService = new HotelService()

    get = async (request: any, response: any) => {
        try{
            const data = await this.bookingService.getBookings(request.user.id)
            response.send(data)
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }

    post = async (request: any, response: any) => {
        try{
            const booking = request.body
            booking.userId = request.user.id
            const usero = await this.userService.getById(booking.userId)
            const hotelo = await this.hotelService.getById(booking.hotelId)
            if(usero && usero.age > 17 && hotelo && hotelo.capacity > booking.visitors){
                await this.bookingService.add(booking.arrival, booking.departure,
                     booking.visitors, booking.userId, booking.hotelId)
                response.send('Successfully added booking')
            } else {
                response.status(400).send('Out of space or you are too young')
            }
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }
}

export default BookingController