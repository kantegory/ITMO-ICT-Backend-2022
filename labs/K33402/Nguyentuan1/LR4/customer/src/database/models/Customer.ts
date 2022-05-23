import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface CustomerSchema {
    firstname: string;
    lastname: String,
    email: String,
    password: String,
    salt: String,
    phone: String,
}

const CustomerSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    salt: String,
    phone: String,
    mybookings: [ 
        { 
            _id: { type: String, require: true},
            Hotelname: { type: String},
            check_in: { type: Date},
            check_out: { type: Date},
            price: { type: Number}
        }
    ]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

export default mongoose.model('customer', CustomerSchema);