const { BookingModel, CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');


//Dealing with data base operations
class BookingRepository {

    // payment

    async Bookings(customerId){
        try{
            const bookings = await BookingModel.find({customerId });        
            return bookings;
        }catch(e) {
            throw new Error(e)
        }
    }
    async CreateNewBooking(customerId, check_in, check_out, price){
        //check transaction for payment Status 
        try{
            // 86873645
            const bookingId = uuidv4();

            const booking = new BookingModel({
                bookingId,
                customerId,
                check_in,
                check_out,
                price,
                status: 'received',
            })
            const bookingResult = await booking.save();
            return bookingResult;
        }catch(e) {
            throw new Error(e)
        }
        

    }
}

module.exports = BookingRepository;