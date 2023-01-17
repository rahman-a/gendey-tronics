import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
    chapter: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chapter',
        required:true
    },
    title:{
        type:String,
        required:[true, 'Lesson title is required']
    },
    description: {
        type:String
    },
    video:{
        type:String
    },
    duration:{
        type:Number
    },
    document:{
        type:String
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    order:{
        type:Number,
        required:true
    }
}, {timestamps:true})

export default mongoose.model('Lesson', lessonSchema)
