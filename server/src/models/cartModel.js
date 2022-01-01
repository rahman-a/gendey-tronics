import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    },
    quantity:{
        type:Number,
        default:1
    },
    options:[{
        question:String,
        option:String
    }]
},{timestamps:true})

export default mongoose.model('Cart', cartSchema)