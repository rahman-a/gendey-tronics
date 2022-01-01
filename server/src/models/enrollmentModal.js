import mongoose from 'mongoose'

const enrollmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    completedLesson:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Lesson'
        }
    ],
    completedChapters:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Chapter'
        }
    ],
    isCourseCompleted: {
        type:Boolean,
        default:false
    },
    currentLesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lesson'
    },
    progress:{
        type:Number,
        default:0
    }
}, {timestamps:true})

export default mongoose.model('Enrollment', enrollmentSchema)