import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comment: {
        type:String,
        required:[true,'Comment can\'t be Empty'] 
    }
}, {timestamps:true})

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,'Blog title is Required'] 
    },
    body:{
        type:String,
        required:[true,'Blog Body is Required']  
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    image: {
        type:String
    },
    seen:{
        type:Number,
        default:0
    },
    comments:[commentSchema]
}, {timestamps:true})

export default mongoose.model('Blog', blogSchema)
