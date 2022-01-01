import Order from '../models/orderModal.js'
import strings from '../localization.js'

export const createOrder = async (req, res, next) => {
    const order = new Order({
        user:req.user._id,
        shippingAddress: req.user.shippingAddress || {},
        ...req.body
    })
    try {
        const newOrder = await order.save()
        const populatedOrder = await Order.findById(newOrder._id).populate({
            path:'orderItems',
            populate:{
                path:'product',
                select:'name price'
            }
        })
        setTimeout(() => {
            res.status(201).json({
                success:true,
                code:201,
                order:populatedOrder
            })
        },1000)
    } catch (error) {
        next(error)
    }
}

export const getOrderById = async(req, res, next) => {
    const {lang} = req.headers

    try {
        let order = null
        if(req.user.isAdmin) {
            order = await Order.findById(req.params.id).populate('user','firstName lastName email')
        } else {
            order = await Order.findOne({_id:req.params.id, user:req.user._id}).populate('user','firstName lastName email')
        }
        if(!order){
            res.status(404)
           throw new Error(strings.product[lang].no_order)
        }
        res.json({
            success:true,
            code:200,
            order
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUserOrders = async(req, res, next) => {
    const {lang} = req.headers

    try {
        const orders = await Order.find({user:req.user._id}).populate({
            path:'orderItems',
            populate:{
                path:'product',
                select:'name price'
            }
        })
        if(!orders || orders.length === 0){
            res.status(404)
            throw new Error(strings.product[lang].no_order)
        }
        res.json({
            success:true,
            code:200,
            orders
        })

    } catch (error) {
        next(error)
    }
}

export const getAllOrders = async (req, res, next) => {
    const {lang} = req.headers

    try {
        const orders = await Order.find({}).populate('user','firstName lastName email')
        if(!orders || orders.length === 0){
            res.status(404)
            throw new Error(strings.product[lang].no_order)
        }
        res.json({
            success:true,
            code:200,
            orders
        })
    } catch (error) {
        next(error)
    }
}

export const updateOrder = async (req, res, next) => {
    const updatedData = req.body
    const {lang} = req.headers

    try {
        const order = await Order.findById(req.params.id) 
        if(!order){
            res.status(404)
            throw new Error(strings.product[lang].no_order)
        }
        const allowedKeys = ['shippingAddress', 'paymentResult', 'isPaid', 'isDelivery']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(key === 'isPaid') {
                    order[key] = updatedData[key]
                    if(order.isPaid) order.paidAt = new Date()
                } else if (key === 'isDelivery') {
                    order[key] = updatedData[key]
                    if(order.isDelivery) order.deliveryAt = new Date()
                }else if (updatedData[key] ) {
                    order[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        await order.save()
        res.json({
            success:true,
            code:200,
            message:strings.product[lang].order_update,
            order:order._id
        })
    } catch (error) {
        next(error)
    }
}

