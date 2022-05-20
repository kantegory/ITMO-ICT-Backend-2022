const mongoose = require('mongoose');
const { DB_URL } = require('../config/index');

module.exports = async() => {
    console.log(DB_URL)
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};

 