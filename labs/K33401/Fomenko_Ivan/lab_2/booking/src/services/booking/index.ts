import Booking from '../../models/booking/Booking'
import {sequelize} from '../../providers/db'

class BookingService {
    private repo = sequelize.getRepository(Booking)

    add(arrival: Date, departure:Date, visitors:number, userId:number, hotelId:number) {
        this.repo.create({arrival: arrival, departure: departure, visitors: visitors, userId: userId, hotelId:hotelId})
    }

    getBookings(useroId: number){
        return this.repo.findAll({where: {userId: useroId}})
    }
}

export default BookingService