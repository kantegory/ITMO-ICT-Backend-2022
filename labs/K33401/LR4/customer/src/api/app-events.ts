import CustomerService from '../controllers/customer';

module.exports = (app: any) => {

    const service = new CustomerService();

    app.use('/app-events', async (req: any,res: any,next: any) => {
        const { payload } = req.body;
        service.SubscribeEvents(payload);

        return res.status(200).json(payload);

    });

}