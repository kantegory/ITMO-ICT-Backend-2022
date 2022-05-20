const { BookingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class BookingService {

    constructor(){
        this.repository = new BookingRepository();
    } 
    async PlaceBooking(userInput){

        const { _id, check_in, check_out, price } = userInput
        
        try {
            const bookingResult = await this.repository.CreateNewBooking(_id, check_in, check_out, price);
            return FormateData(bookingResult);    
        } catch (e) {
            return ({"Error": "Not found"})
        }
        
    }

    async GetBookings(customerId){
        try {
            const bookings = await this.repository.Bookings(customerId);
            return FormateData(bookings)
        } catch (e) {
            return ({"Error": "Not found"})
        }
    }
    async GetBookingPayload(userId,booking,event){
        if(booking){
             const payload = { 
                event: event,
                data: { userId, booking }
            };
 
             return payload
        }else{
            return FormateData({error: 'No Booking Available'});
        }
 
    }

 
  
}

module.exports = BookingService;