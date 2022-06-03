const { ProductModel } = require("../models");
const { APIError,BadRequestError } = require('../../utils/app-errors')

class ProductRepository {


    async CreateProduct({ name, desc, type, unit,price, available, suplier, banner }){

        try {
            const product = new ProductModel({
                name, desc, type, unit,price, available, suplier, banner
            })
    
            const productResult = await product.save();
            return productResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product')
        }
        
    }


     async Products(){
         try{
             return await ProductModel.find();
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Products')
         }
    }
   
    async FindById(id){
        try{
            return await ProductModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }

    }

    async FindByCategory(category){

        try{
            const products = await ProductModel.find({ type: category});
             return products;
            
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category')
        }
    }

    
}

module.exports = ProductRepository;