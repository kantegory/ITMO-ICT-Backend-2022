const BookingService = require("../services/booking-service");
const { SubcribeMessage, PublishMessage} = require("../utils");
const UserAuth = require('./middlewares/auth');
const { CUSTOMER_BINDING_KEY } = require('../config');

module.exports = (app, channel) => {
    const service = new BookingService();
    SubcribeMessage(channel, service)
    app.post('/booking',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { check_in, check_out, price} = req.body
        try {
            const { data } = await service.PlaceBooking({_id, check_in, check_out, price});
            const payload = await service.GetBookingPayload(_id, data, 'CREATE_BOOKING');
      
            PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload))
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