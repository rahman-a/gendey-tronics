import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        default:0
    },
    comment:{
        type:String
    },
    course: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

export default mongoose.model('Review', reviewSchema)
