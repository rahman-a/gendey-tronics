import Wishlist from '../models/wishlistModal.js'
import Course from '../models/courseModal.js'
import Product from '../models/productModal.js'
import strings from '../localization.js'

export const addItemToWishlist = async (req, res, next) => {
  const { lang } = req.headers
  const { item, itemType } = req.body
  const newItem = new Wishlist({
    ...req.body,
    user: req.user._id,
  })
  try {
    const isFound = await Wishlist.findOne({ user: req.user._id, item })
    if (isFound) {
      res.status(400)
      throw new Error(strings.product[lang].already_wishlist)
    }
    const createdItem = await newItem.save()
    if (itemType === 'product') {
      const product = await Product.findById(createdItem.item)
      const targetedProduct = {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
      }
      res.status(201).json({
        success: true,
        code: 201,
        message: strings.product[lang].wishlist_add,
        product: targetedProduct,
      })
    } else {
      res.status(201).json({
        success: true,
        code: 201,
        message: strings.product[lang].wishlist_add,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const removeItemFromWishlist = async (req, res, next) => {
  const { lang } = req.headers
  const { id } = req.params
  try {
    const item = await Wishlist.findOne({ item: id })
    if (!item) {
      res.status(404)
      throw new Error(strings.product[lang].no_item)
    }
    await item.remove()
    res.json({
      success: true,
      code: 200,
      item: item.item,
    })
  } catch (error) {
    next(error)
  }
}

export const listAllWishlistItem = async (req, res, next) => {
  const { lang } = req.headers
  const { type } = req.query
  try {
    const items = await Wishlist.find({ user: req.user._id, itemType: type })
    if (!items || items.length < 1) {
      res.status(404)
      throw new Error(strings.product[lang].no_item)
    }
    let allItems = []
    if (type === 'course') {
      allItems = await Promise.all(
        items.map(async (item) => {
          const course = await Course.findById(item.item)
          return {
            _id: course._id,
            name: course.name,
            description: course.description,
            image: course.image,
            price: course.price,
          }
        })
      )
    } else if (type === 'product') {
      allItems = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findById(item.item)
          return {
            _id: product._id,
            name: product.name,
            image: product.images[0].src,
            price: product.price,
          }
        })
      )
    }
    res.json({
      success: true,
      code: 200,
      items: allItems,
    })
  } catch (error) {
    next(error)
  }
}
