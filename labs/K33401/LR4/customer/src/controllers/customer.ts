
import CustomerRepository from "../database/repository/customer-repository"
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils/index');


class CustomerService {
    private repository: CustomerRepository
    constructor(){
        this.repository = new CustomerRepository();
    }

    SignIn = async (userInputs: { email: any; password: any; }) =>{

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.repository.FindCustomer(email)

            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token });
                } 
            }
    
            return FormateData(null);

        } catch (e: any) {
            return ({"Error": "Not found"})
        }

       
    }
    SignUp = async (userInputs: { firstname: any; lastname: any; email: any; password: any; phone: any; }) => {
        
        const { firstname, lastname, email, password, phone } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            let userPassword = await GeneratePassword(password, salt);
            
            const existingCustomer = this.repository.CreateCustomer({ firstname, lastname, email, password: userPassword, phone, salt });
            
            const token = await GenerateSignature({ email: email});

            return FormateData({token });

        }catch (e: any) {
            return ({"Error": "Not found"})
        }

    }

    GetProfile = async (id: any) => {
        try {
            const existingCustomer = await this.repository.FindCustomerById(id);
            return FormateData(existingCustomer);
            
        } catch (e: any) {
            return ({"Error": "Not found"})
        }
    }

    GetBookingDetails = async (id: any) => {

        try {
            const existingCustomer = this.repository.FindCustomerById({ id });
    
            if(existingCustomer){
               return FormateData(existingCustomer);
            }       
            return FormateData({ msg: 'Error'});
            
        } catch (e: any) {
            return ({"Error": "Not found"})
        }
    }


    ManageBooking = async (customerId: any, booking: any) => {
        try {
            const bookingResult = this.repository.AddBookingToProfile(customerId, booking);
            return FormateData(bookingResult);
        } catch (e: any) {
            return ({"Error": "Not found"})
        }
    }

    async SubscribeEvents(payload: any){
        
        payload = JSON.parse(payload)
        const { event, data } =  payload;
        const { userId, booking } = data;


        switch(event){
            case 'CREATE_BOOKING':
                this.ManageBooking(userId,booking);
                break;
            default:
                break;
        }
 
    }
}

export default CustomerService;