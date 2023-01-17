import Coupon from '../models/couponModal.js'
import strings from '../localization.js'

export const createNewCoupon = async (req, res, next) => {
    const {lang} = req.headers
    const {code} = req.body
    const newCoupon = new Coupon(req.body)

    try {
        const isFound = await Coupon.findOne({code})
        if(isFound) {
            res.status(400)
            throw new Error(strings.course[lang].coupon_exist)
        }
        const coupon = await newCoupon.save()
        res.status(201).json({
            success:true, 
            code:201,
            coupon,
            message:strings.course[lang].coupon_create
        })
    } catch (error) {
        next(error)
    }
}

export const acquireCoupon = async (req, res, next) => {
    const {lang} = req.headers
    const {code} = req.query 
    
    try {
        const coupon = await Coupon.findOne({code})
        if(!coupon){
            res.status(404)
            throw new Error(strings.course[lang].no_coupon)
        }
        if(!(coupon.isValid)){ 
            res.status(400)
            throw new Error(strings.course[lang].coupon_not_valid)
        }

        if(coupon.applyLimit > 0 && coupon.expiryAt){
            const now = new Date().toISOString()
            if(coupon.applyCount >= coupon.applyLimit
                || now > coupon.expiryAt.toISOString()) {
                coupon.isValid = false
                await coupon.save()
                res.status(400)
                throw new Error(strings.course[lang].coupon_expired)
            }
            coupon.applyCount += 1
            if(coupon.applyCount === coupon.applyLimit) coupon.isValid = false
            await coupon.save()
            res.json({
                success:true, 
                code:200,
                coupon:coupon.code,
                discount:coupon.discountPercentage
            })
        }

        if(coupon.applyLimit > 0 && !(coupon.expiryAt)){
            if(coupon.applyCount >= coupon.applyLimit) {
                coupon.isValid = false
                await coupon.save()
                res.status(400)
                throw new Error(strings.course[lang].coupon_expired)
            }
            coupon.applyCount += 1
            if(coupon.applyCount === coupon.applyLimit) coupon.isValid = false
            await coupon.save()
            res.json({
                success:true, 
                code:200,
                coupon:coupon.code,
                discount:coupon.discountPercentage
            })
        }

        if(coupon.expiryAt && coupon.applyLimit < 1){
            const now = new Date().toISOString()
            if(now > coupon.expiryAt.toISOString()) {
                coupon.isValid = false
                await coupon.save()
                res.status(400)
                throw new Error(strings.course[lang].coupon_expired)
            }
            coupon.applyCount += 1
            await coupon.save()
            res.json({
                success:true, 
                code:200,
                coupon:coupon.code,
                discount:coupon.discountPercentage
            })
        }

    } catch (error) {
        next(error)
    }
}   

export const listAllCoupon = async (req, res, next) => {
    const {lang} = req.headers
    const {page, skip} = req.query
    try {
        const coupons = await Coupon.find({...req.body})
        // .limit(parseInt(page) || 25).skip(parseInt(skip) || 0)
        const count = await Coupon.count({})

        if(!coupons || coupons.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_coupon)
        }
        res.json({
            success:true, 
            code:200,
            coupons,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const updateCoupon = async (req, res, next) => {
    const {lang} = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        const coupon = await Coupon.findById(id) 
        if(!coupon) {
            res.status(404)
            throw new Error(strings.course[lang].no_coupon)
        }
        const allowedKeys = ['code', 'discountPercentage','applyLimit','expiryAt']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(key === 'expiryAt') {
                    coupon[key] = updatedData[key]
                }else if(updatedData[key]) {
                    coupon[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        await coupon.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].coupon_update,
            coupon: coupon._id
        })
    } catch (error) {
        next(error)
    }
}

export const toggleCouponValidityState = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    
    try {
        const coupon = await Coupon.findById(id)
        if(!coupon) {
            res.status(404)
            throw new Error(strings.course[lang].no_coupon)
        }
        coupon.isValid = !(coupon.isValid)
        const message = coupon.isValid ? strings.course[lang].valid_coupon : strings.course[lang].not_valid_coupon
        await coupon.save()
        res.json({
            success:true,
            code:200,
            message
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCoupon = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const coupon = await Coupon.findById(id)
        if(!coupon) {
            res.status(404)
            throw new Error(strings.course[lang].no_coupon)
        }
        await coupon.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].coupon_delete
        })
    } catch (error) {
        next(error)
    }
}