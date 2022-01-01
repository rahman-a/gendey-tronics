import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
    code: {
        type:String,
        unique:true,
        required:true 
    },
    discountPercentage: {
        type:Number,
        required:true 
    },
    isValid:{
        type:Boolean,
        default:true
    },
    applyLimit:{
        type:Number,
        default:0
    },
    applyCount:{
        type:Number,
        default:0
    },
    expiryAt:{
        type:Date
    }

},{timestamps:true})

export default mongoose.model('Coupon', couponSchema)