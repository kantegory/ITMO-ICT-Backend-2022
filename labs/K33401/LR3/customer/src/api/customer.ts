import CustomerService from '../controllers/customer';
const UserAuth =require('./middlewares/auth');

module.exports = (app: { post: (arg0: string, arg1: { (req: any, res: any, next: any): Promise<any>; (req: any, res: any, next: any): Promise<any>; }) => void; get: (arg0: string, arg1: typeof UserAuth, arg2: { (req: any, res: any, next: any): Promise<any>; (req: any, res: any, next: any): Promise<any>; }) => void; }) => {
    
    const service = new CustomerService();

    app.post('/signup', async (req: { body: { firstname: string; lastname: string; email: string; password: string; phone: string }; } ,res: { json: (arg0: string) => any; } ,next: (arg0: any) => void) => {
        try {
            const {firstname, lastname, email, password, phone } = req.body;
            const { data } : any|string = await service.SignUp({firstname, lastname, email, password, phone}); 
           return res.json("Created");
            
        } catch (err) {
            next(err)
        }

    });
    app.post('/login',  async (req: { body: { email: any; password: any; }; },res: { json: (arg0: any) => any; },next: (arg0: any) => void) => {
        
        try {
            
            const { email, password } = req.body;
    
            const { data } : any|string = await service.SignIn({ email, password});
    
            return res.json(data);

        } catch (err) {
            next(err)
        }

    });
    app.get('/profile', UserAuth ,async (req: { user: { _id: any; }; },res: { json: (arg0: any) => any; },next: (arg0: any) => void) => {

        try {
            const { _id } = req.user;
            const { data } : any|string = await service.GetProfile({ _id });
            return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
    app.get('/booking-details', UserAuth, async (req: { user: { _id: any; }; },res: { json: (arg0: any) => any; },next: (arg0: any) => void) => {
        
        try {
            const { _id } = req.user;
           const { data } : any|string = await service.GetBookingDetails(_id);
    
           return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
}