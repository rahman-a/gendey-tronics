import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Course Name is Required']
    },
    description: {
        type:String,
        required:[true,'Course Description is Required']
    },
    language: {
        type:String,
        default:'arabic',
        required:[true,'Course Language is Required']
    },
    price: {
        type:Number,
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'Course Instructor Id is Required'],
        ref:'Instructor'
    },
    points:[
        {
            point: {
                type:String
            },
            order: {
                type:Number
            }
        }
    ],
    requirements:[
        {
            type:String
        }
    ],
    image:{
        type:String,
    },
    targets:[
        {
            type:String
        }
    ],
    isPaid: {
        type:Boolean,
        default:false
    },
    discount:{
        type:Number,
        default:0
    },
    trailer: {
        type:String,
        required:[true,'Course Trailer Link is Required']
    },

},{timestamps:true})


export default mongoose.model('Course', courseSchema)
