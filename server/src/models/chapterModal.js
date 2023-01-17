import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
    course: {
        type:mongoose.Schema.Types.ObjectId,
        required:true 
    },
    title: {
        type:String,
        required:[true, 'Chapter title is Required']
    },
    order: {
        type:Number,
        required:true
    },
    isPaid: {
        type:Boolean,
        default:false
    }
}, {timestamps:true})

export default mongoose.model('Chapter', chapterSchema)
