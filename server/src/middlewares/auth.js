import User from '../models/userModal.js'
import jwt from 'jsonwebtoken'
import strings from '../localization.js'

export const isAuth = async(req, res, next) => {
    const {lang} = req.headers
    try {
        if(req.cookies['token'] || req.cookies['tokenAd']){

            const token =  req.cookies['token'] || req.cookies['tokenAd']
            const decode = jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
                if(err) {
                    throw new Error(strings.auth[lang].log_first)
                } 
                return decode
            })

            const user = await User.findOne({_id:decode._id})
            if(!user) {
                res.status(401)
                throw new Error(strings.auth[lang].log_first)
            }
            req.user = user 
            req.token = token 
            next()
        }else {
            res.status(401)
            throw new Error(strings.auth[lang].log_first)
        }
    } catch (error) {
        next(error)
    }
    
}


export const isAdmin = (req, res, next) => {
    const {lang} = req.headers
    if(req.user.isAdmin) {
        next()
        return 
    }

    throw new Error(strings.auth[lang].not_auth)
}

export const checkApiKey = (req, res, next) => {
    const {lang} = req.headers

    if(req.headers.apikey){
        try {
            if(req.headers.apikey === process.env.APIKEY) next()
            else {
                res.status(401)
                throw new Error(strings.auth[lang].valid_api_key)
            }
        } catch (error) {
            next(error)
        }
    }else  {
        res.status(401)
        next(new Error(strings.auth[lang].not_auth_api))
    }
}