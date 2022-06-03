import { Hotel } from "../../model/Hotel/Hotel";
import { Client } from "../../model/User/Users";
import { Booking, BookingInput, BookingOutput } from '../../model/Booking/booking';
import UserError from '../../errors/users';

class BookServices {
    async create(userData: BookingInput) : Promise<Booking|UserError> {
        try {
            const data = await Booking.create(userData)
            return(data)
        } catch(e: any) {
            throw new Error(e)
        }
    }
    async getall(User_id: BookingInput) : Promise<any> {
        try{
            const test = await Booking.findAll({ where: {User_id}})
            return(test)
        } catch(e: any) {
            throw new Error(e)
        }
    }
}
export default BookServices