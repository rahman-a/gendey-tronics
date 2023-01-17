import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name: {
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }

}, {timestamps:true})

export default mongoose.model('Contact', contactSchema)