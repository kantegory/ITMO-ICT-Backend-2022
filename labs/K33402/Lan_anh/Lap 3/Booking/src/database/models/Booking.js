const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    bookingId: String,
    customerId: String,
    check_in: Date,
    check_out: Date,
    price: Number,
    txnId: String,
    Hotel: [
        {
            _id: { type: String, require: true},
            Hotelname: { type: String},
            Address: {type: String},
            Asscess: { type: Number},
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('booking', BookingSchema);