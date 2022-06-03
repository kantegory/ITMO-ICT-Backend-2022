const CustomerService = require('../services/customer-service');
const  UserAuth = require('./middlewares/auth');

const { SubscribeMessage } = require('../utils')

module.exports = (app, channel) => {
    
    const service = new CustomerService();
    SubscribeMessage(channel, service)

    app.post('/signup', async (req,res,next) => {
        try {
            const { email, password, phone } = req.body;
            const { data } = await service.SignUp({ email, password, phone}); 
           return res.json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.post('/login',  async (req,res,next) => {
        
        try {
            
            const { email, password } = req.body;
    
            const { data } = await service.SignIn({ email, password});
    
            return res.json(data);

        } catch (err) {
            next(err)
        }

    });
     

    app.get('/profile', UserAuth ,async (req,res,next) => {

        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });
            return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
}