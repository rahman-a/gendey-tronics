import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Product Name is Required']
    },
    short: {
        type:String,
    },
    description:{
        type:String,
        required:[true,'Product Description is Required']
    },
    price: {
        type:Number,
        required:[true,'Product Price is Required']
    },
    type: {
        type:String,
        required:[true,'Product Type is Required']
    },
    image: {
        type:String 
    },
    video: {
        type:String 
    },
    quantity:{
        type:Number,
        required:[true,'Product Quantity is Required']
    },
    isListed: {
        type:Boolean,
        default:false
    },
    driveFile:[{
        link:String,
        part:Number
    }],
    options:[{
        question:String,
        elements:Array
    }]
}, {
    timestamps:true
})

export default mongoose.model('Product', productSchema)
