import mongoose from 'mongoose'

const callSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    date: {
        type:Date,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false 
    }
}, {timestamps:true})

export default mongoose.model('Call', callSchema)