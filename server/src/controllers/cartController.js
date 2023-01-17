import Cart from '../models/cartModel.js'
import strings from '../localization.js'

export const addItemToCart = async (req, res, next) => {
    const {lang} = req.headers

    const newCartItem = new Cart({
        user:req.user._id,
        ...req.body
    })

    try {
        const item = await newCartItem.save()
        const populatedItem = await Cart.findById(item._id).populate('item', 'name price')
        res.status(201).json({
            success:true,
            code:201,
            message:strings.product[lang].item_add,
            item:populatedItem
        })
    } catch (error) {
        next(error)
    }
}

export const removeItemFromCart = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const item = await Cart.findById(id)
        if(!item) {
            res.status(400)
            throw new Error(strings.product[lang].no_item)
        }
        await item.remove()
        res.json({
            success:true,
            code:200,
            message:strings.product[lang].item_delete,
            item:item._id
        })
    } catch (error) {
        next(error)
    }
}

export const listCartItems = async (req, res, next) => {
    const {lang} = req.headers

    try {
        const items = await Cart.find({user:req.user._id}).populate('item', 'name price')
        if(!items || items.length === 0) {
            res.status(400)
            throw new Error(strings.product[lang].cart_empty)
        }
        res.json({
            success:true,
            code:200,
            items
        })
    } catch (error) {
        next(error)
    }
}


export const deleteAllCartItems = async (req, res, next) => {
    const {lang} = req.headers

    try {
        await Cart.deleteMany({user:req.user._id})
        res.json({
            success:true,
            code:200,
            message:strings.product[lang].cart_clear
        })
    } catch (error) {
        next(error)
    }
}