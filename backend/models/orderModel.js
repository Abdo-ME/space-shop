import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name:{type:String, required:true},
            qty:{type:Number, required:true},
            image:{type:String, required:true},
            price:{type:Number, required:true},
            product: {
                type: mongoose.Schema.types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shippingAddress: {
       address: {type:String, required:true},
       city: {type:String, required:true},
       postalCode: {type:String, required:true},
       country: {type:String, required:true},
    },
    paymentMethod: {
        type: String,
        require: true
    },
    paymentResult: {
        id: {type:String},
        status: {type:String},
        update_time: {type:String},
        email_adress: {type:String},
        
    },
    taxtPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    
    isPaid: {
        type: Boolean,
        require: true,
        default: false
    },
    paidAt: {
        type: date
    },
    isDelivered: {
        type: Boolean,
        require: true,
        default: false
    },
    deliveredAt: {
        type: date
    },
    
    
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order