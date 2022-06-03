import CustomerService from '../controllers/customer';

module.exports = (app: any) => {

    const service = new CustomerService();

    app.use('/app-events', async (req: any,res: any,next: any) => {
        console.log(req.body)
        const { payload } = req.body;
        service.SubscribeEvents(payload);

        console.log("===============  Customer Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}