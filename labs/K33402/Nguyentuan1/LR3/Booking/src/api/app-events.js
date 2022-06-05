const BookingService = require('../services/booking-service');

module.exports = (app) => {

    const service = new BookingService();

    app.use('/app-events', async (req,res,next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log("===============  Booking Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}