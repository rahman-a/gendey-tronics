import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    announcement:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    comments: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]
}, {timestamps:true})

export default mongoose.model('Announcement', announcementSchema)