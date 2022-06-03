const { CustomerModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')


class CustomerRepository {

    async CreateCustomer({ email, password, phone, salt }){
        try{
            const customer = new CustomerModel({
                email,
                password,
                salt,
                phone
            })
            const customerResult = await customer.save();
            return customerResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    }
    

    async FindCustomer({ email }){
        try{
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }

    async FindCustomerById({ id }){

        try {
            const existingCustomer = await CustomerModel.findById(id)
            
            return existingCustomer;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
        }
    }


    async AddCartItem(customerId, {  _id, name, price, banner }, qty, isRemove){

        try{

            const profile = await CustomerModel.findById(customerId).populate('cart');
    
            if(profile){ 
     
                const cartItem = {
                    product: { _id, name, price, banner},
                    unit: qty,
                };
              
                let cartItems = profile.cart;
                
                if(cartItems.length > 0){
                    let isExist = false;
                     cartItems.map(item => {

                        if(item.product._id.toString() === _id.toString()){
                            if(isRemove){
                                cartItems.splice(cartItems.indexOf(item), 1);
                            }else{
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
    
                    if(!isExist){
                        cartItems.push(cartItem);
                    } 
                }else{
                    cartItems.push(cartItem);
                }
    
                profile.cart = cartItems;
    
                const cartSaveResult = await profile.save();

                return cartSaveResult;
            }
            
            throw new Error('Unable to add to cart!');

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }

    }

    async AddOrderToProfile(customerId, order){
 
        
        try{

            const profile = await CustomerModel.findById(customerId);

            if(profile){ 
                
                if(profile.orders == undefined){
                    profile.orders = []
                }
                profile.orders.push(order);

                profile.cart = [];

                const profileResult = await profile.save();

                return profileResult;
            }
            
            throw new Error('Unable to add to order!');

        }catch(err){

            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
        
    }

}

module.exports = CustomerRepository;