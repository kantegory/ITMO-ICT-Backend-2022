const BookingService = require("../services/booking-service");
const { PublishCustomerEvent } = require("../utils");
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new BookingService();

    app.post('/booking',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { check_in, check_out, price} = req.body
        try {
            const { data } = await service.PlaceBooking({_id, check_in, check_out, price});


            const payload = await service.GetBookingPayload(_id, data, 'CREATE_Booking');

            PublishCustomerEvent(payload);

            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.get('/booking',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.Getbookings(_id);

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    });
}