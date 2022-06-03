const ProductService = require('../services/product-service');
const { PublishMessage } = require('../utils');
const { SHOPPING_BINDING_KEY, CUSTOMER_BINDING_KEY } = require('../config')
const UserAuth = require('./middlewares/auth')

module.exports = (app, channel) => {
    
    const service = new ProductService();

    app.post('/product/create', async(req,res,next) => {
        
        try {
            const { name, desc, type, unit,price, available, suplier, banner } = req.body; 
            const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
            return res.json(data);
            
        } catch (err) {
            next(err)
        }
        
    });

    app.get('/category/:type', async(req,res,next) => {
        
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/:id', async(req,res,next) => {
        
        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });
     

    app.put('/cart',UserAuth, async (req,res,next) => {
        
        const { _id } = req.user;
        
        try {     

            const { data } = await  service.GetProductPayload(_id, { productId: req.body._id, qty: req.body.qty },'ADD_TO_CART') 

            // PublishCustomerEvent(data);
            PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(data))

            // PublishShoppingEvent(data)
            PublishMessage(channel, SHOPPING_BINDING_KEY, JSON.stringify(data))

            const response = {
                product: data.data.product,
                unit: data.data.qty 
            }
    
            return res.status(200).json(response);
            
        } catch (err) {
            next(err)
        }
    });
    
    app.delete('/cart/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const productId = req.params.id;

        try {

            const { data } = await  service.GetProductPayload(_id, { productId },'REMOVE_FROM_CART') 

            // PublishCustomerEvent(data)
            PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(data))

            // PublishShoppingEvent(data)
            PublishMessage(channel, SHOPPING_BINDING_KEY, JSON.stringify(data))
                     
            const response = {
                product: data.data.product,
                unit: data.data.qty 
            }
    
            return res.status(200).json(response);

        } catch (err) {
            next(err)
        }
    });

    app.get('/', async (req,res,next) => {
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
        
    });
    
}