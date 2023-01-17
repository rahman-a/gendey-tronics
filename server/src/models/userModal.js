import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import strings from '../localization.js'

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        lowerCase:true,
        required:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phoneNumber: {
        type:String
    },
    password: {
        type:String,
        minlength:[8, 'Password must be at least eight characters'],
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        match:[/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g, 'Password must be at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character']
    },
    avatar:{
        type:String
    }, 
    shippingAddress:{
        address:{type:String},
        city:{type:String},
        postalCode:{type:String},
        country:{type:String},
        state:{type:String},
        mapLink: {type:String}
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    isPhoneVerified: {
        type:Boolean,
        default:false
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
    loggedBy:{
        type:String,
        default:'local'
    },
    AuthString:{
        type:String
    }
}, {
    timestamps:true
})

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.isEmailVerified 
    delete user.isPhoneVerified 
    delete user.AuthString 
    if(!(user.isAdmin)) delete user.isAdmin
    const checkShippingAddress = (address) => {
        for(let key in address){
            if(address[key]) return true
        }
        return false
    }
    
    if(user.shippingAddress){
        if(!(checkShippingAddress(user.shippingAddress))) {
            delete user.shippingAddress
        }
    }
    return user
}

userSchema.methods.toAuthJSON = function () {
    return  {
        _id:this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber:this.phoneNumber
    }
}

userSchema.statics.AuthUser = async function (email, password, res, lang) {
    const user = await User.findOne({email})
    if(!user) {
        res.status(401)
        throw new Error(strings.user[lang].wrong_auth)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        res.status(401)
        throw new Error(strings.user[lang].wrong_auth)
    }
    if(!(user.isEmailVerified)) {
        res.status(401)
        throw new Error(strings.user[lang].email_not_verify)
    }
    return user
}


userSchema.methods.generateToken = function (days = '7 days') {
    const token = jwt.sign({_id:this._id.toString(),}, process.env.JWT_TOKEN, {expiresIn:days})
    return token 
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User  = mongoose.model('User', userSchema)
export default User
