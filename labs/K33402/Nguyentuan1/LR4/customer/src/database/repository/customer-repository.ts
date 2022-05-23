import  CustomerModel  from '../models/Customer';

//Dealing with data base operations
class CustomerRepository {

    async CreateCustomer(userinput : { firstname: string, lastname: string, email: string, password: string, phone: string, salt: string }){
        try{
            const user = await CustomerModel.create(userinput)
            return user;
        }catch(e: any) {
            throw new Error(e)
        }
    }
    
    async FindCustomer(email: string) : Promise<any>{
        try{
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        }catch(e: any) {
            throw new Error(e)
        }
    }

    async FindCustomerById(id : any) : Promise<any>{

        try {
            const existingCustomer = await CustomerModel.findById(id._id)
            return existingCustomer
        } catch(e: any) {
            throw new Error(e)
        }
    }

    async AddBookingToProfile(customerId: any, booking: any){
 
        
        try{    
            const profile = await CustomerModel.findById(customerId);

            if(profile){ 
                profile.mybookings.push(booking);

                const profileResult = await profile.save();

                return profileResult;
            }
            
            throw new Error('Unable to add to booking!');

        }catch(e: any) {
            throw new Error(e)
        }
        
    }

}

export default CustomerRepository;