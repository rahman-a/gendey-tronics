import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true 
    },
    itemType:{
        type:String,
        required:[true, 'Please Provide the item type']
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
}, {timestamps:true})

export default mongoose.model('Wishlist', wishlistSchema)