import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true 
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true 
    },
    lesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lesson',
        required:true 
    },
    note:{
        type:String,
        required:true,
    },
    time: {
        // convert time into second in frontend before store it
        type:Number,
        default:0
    }
},{timestamps:true})

export default mongoose.model('Note', noteSchema)