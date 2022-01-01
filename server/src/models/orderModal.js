import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            quantity:{type:Number, required:true},
            options:Array,
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            }
        }
    ],
    shippingAddress:{
        address:{type:String},
        city:{type:String},
        postalCode:{type:String},
        country:{type:String},
    },
    paymentMethod:{
        type:String,
        default:'paypal'
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        default:true
    },
    paidAt:{
        type:Date,
        default:new Date().toISOString()
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    },
    deliveredAt:{
        type:Date
    },
},{
    timestamps:true
})


export default mongoose.model('Order', orderSchema)