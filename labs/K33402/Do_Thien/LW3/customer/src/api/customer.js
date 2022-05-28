const CustomerService = require('../services/customer-service');
const  UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new CustomerService();

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