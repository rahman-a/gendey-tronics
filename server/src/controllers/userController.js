import User from '../models/userModal.js'
import Course from '../models/courseModal.js'
import Product from '../models/productModal.js'
import Blog from '../models/blogModel.js'
import Enrollment from '../models/enrollmentModal.js'
import Order from '../models/orderModal.js'
import randomstring from 'randomstring'
import sendEmail from '../../emails/send.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {OAuth2Client} from 'google-auth-library';
import fetch from 'node-fetch'
import crypto from 'crypto'
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
import strings from '../localization.js'

export const createNewUser = async (req, res, next) => {
    const {email} = req.body
    const newUser = new User(req.body)
    const {lang} = req.headers
    try {
        if(!email) {
            res.status(401)
            throw new Error(strings.user[lang].require_email)
        }
        const isFound = await User.findOne({email})
        if(isFound) {
            res.status(401)
            throw new Error(strings.user[lang].email_exist)
        }
        const user = await newUser.save()
        await sendAuthLinkToUser(user, req,'activate')
        res.status(201).send({
            success:true,
            code:201,
            user:user._id,
            message:strings.user[lang].create_account
        })
    } catch (error) {
        next(error)
    }
}

export const userAuthentication = async (req, res, next) => {
    const {email, password} = req.body
    const {lang} = req.headers

    try {
        if(!email) {
            res.status(400)
            throw new Error(strings.user[lang].require_email)
        }
        if(!password) {
            res.status(400)
            throw new Error(strings.user[lang].require_pass)
        }
        const user = await User.AuthUser(email, password, res, lang)
        const token = user.generateToken()
        res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7})
        res.json({
            success:true, 
            code:200,
            user: user,
            expiryAt: expireAt(7)
        })
    } catch (error) {
        next(error)
    }
}

export const adminLogin = async (req, res, next) => {
    const {email, password} = req.body 
    try {
        if(!email) {
            res.status(400)
            throw new Error('Please, Provide Your E-mail Address')
        }
        if(!password) {
            res.status(400)
            throw new Error('Please, Provide Your Password')
        }
        const user = await User.AuthUser(email, password, res, 'en')
        if(!(user.isAdmin)) {
            res.status(401)
            throw new Error('invalid login or password')
        }
        const token = user.generateToken('1d')
        res.cookie('tokenAd', token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 1,
            secure:process.env.NODE_ENV !== 'development'
        })
        res.json({
            success:true, 
            code:200,
            id: user._id,
            expiryAt: expireAt(1)
        })
    } catch (error) {
        next(error)
    }
}

export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie('tokenAd')
        res.json({
            success:true,
            code:200
        })
    } catch (error) {
     next(error)   
    }
}

export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.json({
            success:true,
            code:200
        })
    } catch (error) {
     next(error)   
    }
}

export const updateUserData = async (req, res, next) => {
    const updatedData = req.body 
    const user = req.user
    const {lang} = req.headers

    try {
        console.log(updatedData);
        const allowedKeys = ['firstName', 'lastName', 'email', 
        'phoneNumber', 'isEmailVerified', 'isPhoneVerified', 'shippingAddress']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(key === 'shippingAddress') {
                    const address = updatedData['shippingAddress']
                    for(let key in address){
                        user['shippingAddress'][key] = address[key]
                    }
                }else if (updatedData[key]) {
                    user[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        await user.save()
        res.json({
            success:true,
            code:200,
            message:strings.user[lang].account_update,
            user
        })
    } catch (error) {
        next(error)
    }
}

export const updatePassword = async (req, res, next) => {
    const {oldPass, newPass} = req.body 
    const {lang} = req.headers

    try {
        const user = await User.findOne({email:req.user.email})
        if(user.password && !oldPass) {
            res.status(400)
            throw new Error(strings.user[lang].old_pass_isValid)
        }
        if(!newPass) {
            res.status(400)
            throw new Error(strings.user[lang].pass_isValid)
        }
       if(user.password) {
           const isMatch = await bcrypt.compare(oldPass, user.password) 
           if(!isMatch) {
               res.status(400)
               throw new Error(strings.user[lang].old_pass_isValid)
           }
           user.password = newPass
       }else  {
           user.password = newPass
       }
        await user.save()
        res.json({
            success:true,
            code:200,
            message:strings.user[lang].pass_update
        })
    } catch (error) {
        next(error)
    }
}

export const getUserData = async (req, res, next) => {
    try {
        res.json({
            success:true,
            code:200,
            user:req.user
        })
    } catch (error) {
        next(error)        
    }
}

export const getUserDataById = async (req, res, next) => {
    const {id} = req.params 
    const {lang} = req.headers

    try {
        const user = await User.findById(id)
        if(!user) {
            res.status(404)
            throw new Error(strings.user[lang].no_user)
        }
        res.json({
            success:true,
            code:200,
            user: user
        })
    } catch (error) {
        next(error)
    }
}

export const listAllUsers =  async (req, res, next) => {
    const {name,page,skip} = req.query
    const {lang} = req.headers

    let searchFilter = {isAdmin:{$ne:true}}
    
    try {
        if(name) {
            searchFilter = {
                ...searchFilter,
                firstName: {
                    $regex:name,
                    $options:'i'
                }
            }
        }
        console.log({searchFilter});
        const count = await User.count({...searchFilter})
        console.log({count});
        const users = await User.find({...searchFilter})
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0)
        
        if(!users || users.length < 1) {
            res.status(404)
            throw new Error(strings.user[lang].no_user)
        }
        
        res.json({
            success:true,
            code:200,
            users,
            count
        })
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const googleSignIn = async(req, res, next) => {
    try {
        let user = null
        const googleToken = req.body.token
        const userObj = await verifyGoogleToken(googleToken)
        const isExist = await User.findOne({email: userObj.email})
        if(!isExist) {
            const newUser = new User(userObj)
            user = await newUser.save()
        }else {
            user = isExist
        }
        const token = user.generateToken()
        res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7})
        res.json({
            success:true,
            code:200,
            expiryAt:expireAt(7),
            user
        })
        
        
    } catch (error) {
        next(error)
    }
}

export const facebookSignIn = async(req, res, next) => {
    const {token} = req.body
    try {
        let user = null
        const fetchedUser = await verifyFacebookToken(token)
        const isExist = await User.findOne({email: fetchedUser.email})
        if(!isExist) {
            const newUser = new User(fetchedUser)
            user = await newUser.save()
        }else {
            user = isExist
        }
        const generatedToken = user.generateToken()
        res.cookie('token', generatedToken, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7})
        res.json({
            success:true,
            code:200,
            expiryAt:expireAt(7),
            user
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUserAccount = async (req, res, next) => {
    const {lang} = req.headers
    try {
        await req.user.remove()
        res.json({
            success:true,
            code:200,
            message:strings.user[lang].account_delete,
            user:req.user._id
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUserById = async (req, res, next) => {
    const {id} = req.params 

    try {
        const user = await User.findById(id) 
        
        if(!user) {
            res.status(404)
            throw new Error('No User Found')
        }
        await user.remove() 
        res.json({
            success:true,
            code:200,
            message:'user has been removed'
        })
    } catch (error) {
        next(error)
    }
}

export const sendEmailActivationLink = async (req, res, next) => {
    const {lang} = req.headers

    // destructure email from req.body
    const {email} = req.body   
    try {  
        // check if email exist or not
        const user = await User.findOne({email})
        
        // if not send error
        if(!user) throw new Error(strings.user[lang].no_email_account)
        
        await sendAuthLinkToUser(user, req,'activate')
        res.send({
            success:true,
            code:200,
            message:strings.user[lang].link_sent
        })
    } catch (error) {
        next(error)
    }
}

export const sendRestPasswordLink = async (req, res, next) => {
    const {email} = req.body
    const {lang} = req.headers

    try {  
        // check if email exist or not
        const user = await User.findOne({email})
        
        // if not send error
        if(!user) throw new Error(strings.user[lang].no_email_account)
        
        await sendAuthLinkToUser(user, req,'reset')
        res.send({
            success:true,
            code:200,
            message:strings.user[lang].link_sent
        })
    } catch (error) {
        next(error)
    }
}

export const verifyAuthLink = async (req, res, next) => {
    const {token, type, password} = req.body 
    const {lang} = req.headers

    try {
        // decode the token to extract user id
        const decode = jwt.verify(token, process.env.RESET_TOKEN, (err, decode) => {
            if(err){
                throw new Error(strings.user[lang].invalid_link)
            }
            return decode
        })
        // find the user using id from token
        const user = await User.findOne({_id:decode.id})
        
        // if not user send error
        if(!user) throw new Error(strings.user[lang].no_email_account)
        // check if reset code == the user reset code
        const isResetCodeMatch = await bcrypt.compare(decode.code, user.AuthString)
        
        // if not send error
        if(!isResetCodeMatch) throw new Error(strings.user[lang].invalid_link)
        
        if(type === 'activate') {
            user.isEmailVerified = true
            await user.save()
            res.json({
                success:true,
                code:200,
                message:strings.user[lang].email_verified
            })
        }else if(type ==='reset') {
            user.password = password
            await user.save()
            // send success from server
            res.json({
                success:true,
                code:200,
                message:strings.user[lang].pass_reset_done
            })
        }
    } catch (error) {
       next(error) 
    }
}

export const getCourseAndProductDownloadLink = async (req, res, next) => {
    
    try {
        const enrollments = await Enrollment.find({user:req.user._id}, {course:1})
        .populate('course', 'name driveFile')
        const orders = await Order.find({user:req.user._id}, {orderItems:1})
        .populate({
            path:'orderItems',
            populate:{
                path:'product',
                select:'name driveFile'
            }
        })

        const courseLinks = []

        for(const enrollment of enrollments) {
            if(enrollment.course.driveFile.length) {
                courseLinks.push({
                    _id:enrollment.course._id,
                    name:enrollment.course.name,
                    links:enrollment.course.driveFile,
                    type:'course'
                })
            }
        }

        const productLinks = []

        for(const order of orders)  {
            for(const item of order.orderItems) {
                if(item.product.driveFile.length) {
                    productLinks.push({
                        _id:crypto.randomBytes(16).toString('hex'),
                        name:item.product.name,
                        links:item.product.driveFile,
                        type:'product'
                    })
                }
            }
        }

        res.send({
            code:200, 
            success:true,
            links : [...courseLinks, ...productLinks]
        })
    } catch (error) {
        next(error)
    }
}

export const generalSearchHandler = async (req, res, next) => { 
    const {keyword} = req.query

    console.log({keyword})
    console.log('this is search endpoint');
    try {
        const result  = []

        const courses = await Course.find({
            isPublished:true,
            $or:[
                {name:new RegExp(keyword, 'i')},
                {description:new RegExp(keyword, 'i')}
            ]
        }, {name:1, description:1, _id:1})

        for(const course of courses) {
            result.push({
                _id:course._id,
                title:course.name,
                description:course.description,
                type:'course'
            })
        }


        const products = await Product.find({
            isListed:true,
            $or:[
                {name:new RegExp(keyword, 'i')},
                {description:new RegExp(keyword, 'i')}
            ]
        }, {name:1, description:1, _id:1})

        for(const product of products) { 
            result.push({
                _id:product._id,
                title:product.name,
                description:product.description,
                type:'product'
            })
        }

        const blogs = await Blog.find({
            $or:[
                {title:new RegExp(keyword, 'i')},
                {body:new RegExp(keyword, 'i')}
            ]
        }, {title:1, body:1, _id:1})

        for(const blog of blogs) {
            result.push({
                _id:blog._id,
                title:blog.title,
                description:blog.body,
                type:'blog'
            })
        }
        
        
        res.send({
            code:200,
            success:true,
            result
        })
    } catch (error) {
        next(error)
    }
}

const sendAuthLinkToUser = async (user, req, type) => {
 
    try {
           
        // create randomstring
        const resetCode = randomstring.generate()
        
        // create token
        const token = jwt.sign({id:user._id.toString(), code:resetCode}, process.env.RESET_TOKEN, {expiresIn:'1 day'})
        
        // crypt this random string
        const cryptResetCode = await bcrypt.hash(resetCode, 10)
        
        // store in db
        user.AuthString = cryptResetCode
        await user.save()
        
        // compose the url
        const resetUrl = `${req.protocol}://${req.hostname}/${type}?TOKEN=${token}`
        // const resetUrl = `${req.protocol}://172.21.80.180:3000/${type}?TOKEN=${token}`
        const info = {
            link:resetUrl,
            name:user.firstName,
            email:user.email
        }
        await sendEmail(info, type)
    } catch (error) {
       throw new Error(error)
    }
}

async function verifyFacebookToken(token) {
    const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${token}`)
    const userObj = await response.json()
    return {
        firstName:userObj.first_name,
        lastName:userObj.last_name,
        email:userObj.email,
        avatar:userObj.picture.data.url,
        loggedBy:'facebook'
    }
}

async function verifyGoogleToken(token) {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    return {
        email : payload.email,
        firstName : payload.given_name,
        lastName : payload.family_name,
        avatar  : payload.picture,
        isEmailVerified:true,
        loggedBy:'google'
    }
}


function expireAt(day) { 
    const today = new Date()
    const expiry = new Date(today)
    return expiry.setDate(today.getDate() + day)
}