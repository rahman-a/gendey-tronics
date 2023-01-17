import Order from '../models/orderModal.js'
import strings from '../localization.js'
import { ObjectId } from 'mongoose/lib/types/index.js'

export const createOrder = async (req, res, next) => {
  const order = new Order({
    user: req.user._id,
    shippingAddress: req.user.shippingAddress || {},
    ...req.body,
  })
  try {
    const newOrder = await order.save()
    const populatedOrder = await Order.findById(newOrder._id).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'name price driveFile',
      },
    })
    console.log('populatedOrder: ', populatedOrder)
    res.status(201).json({
      success: true,
      code: 201,
      message: 'New Order has Created Successfully',
      order: populatedOrder,
    })
  } catch (error) {
    next(error)
  }
}

export const getOrderById = async (req, res, next) => {
  const { lang } = req.headers

  try {
    let order = null
    if (req.user.isAdmin) {
      order = await Order.findById(req.params.id).populate(
        'user',
        'firstName lastName email'
      )
    } else {
      order = await Order.findOne({
        _id: req.params.id,
        user: req.user._id,
      }).populate('user', 'firstName lastName email')
    }
    if (!order) {
      res.status(404)
      throw new Error(strings.product[lang].no_order)
    }
    res.json({
      success: true,
      code: 200,
      order,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUserOrders = async (req, res, next) => {
  const { lang } = req.headers

  try {
    const orders = await Order.find({ user: req.user._id }).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'name price images',
      },
    })
    if (!orders || orders.length === 0) {
      res.status(404)
      throw new Error(strings.product[lang].no_order)
    }
    res.json({
      success: true,
      code: 200,
      orders,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (req, res, next) => {
  const { lang } = req.headers
  const { firstName, _id, createdAt, totalPrice, skip } = req.query
  try {
    let searchFilter = {}
    if (firstName) {
      searchFilter = {
        ...searchFilter,
        'user.firstName': {
          $regex: firstName,
          $options: 'i',
        },
      }
    }
    if (_id) {
      searchFilter = {
        ...searchFilter,
        _id: ObjectId(_id),
      }
    }
    if (createdAt) {
      const date = new Date(createdAt)
      date.setDate(date.getDate() + 1)
      searchFilter = {
        ...searchFilter,
        createdAt: {
          $gte: new Date(createdAt),
          $lt: new Date(date),
        },
      }
    }
    if (totalPrice) {
      const priceRange = totalPrice.split('-')
      if (priceRange.length > 1) {
        const firstRange = parseInt(priceRange[0])
        const secondRange = parseInt(priceRange[1])

        searchFilter = {
          ...searchFilter,
          totalPrice: {
            $gte: firstRange,
            $lte: secondRange,
          },
        }
      } else {
        searchFilter = {
          ...searchFilter,
          totalPrice: parseInt(priceRange[0]),
        }
      }
    }

    console.log({ ...searchFilter })

    const aggregateOption = [
      {
        $lookup: {
          from: 'users',
          let: { userId: '$user' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$userId'],
                },
              },
            },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                phoneNumber: 1,
                email: 1,
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $unwind: '$orderItems',
      },
      {
        $lookup: {
          from: 'products',
          let: { productId: '$orderItems.product' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$productId'],
                },
              },
            },
            {
              $project: {
                name: 1,
                price: 1,
                type: 1,
                images: 1,
              },
            },
          ],
          as: 'product',
        },
      },
      {
        $set: { 'orderItems.product': '$product' },
      },
      {
        $unwind: '$orderItems.product',
      },
      {
        $group: {
          _id: '$_id',
          user: { $first: '$user' },
          orderItems: { $push: '$orderItems' },
          shippingAddress: { $first: '$shippingAddress' },
          paymentMethod: { $first: '$paymentMethod' },
          paymentResult: { $first: '$paymentResult' },
          totalPrice: { $first: '$totalPrice' },
          isPaid: { $first: '$isPaid' },
          isDelivered: { $first: '$isDelivered' },
          createdAt: { $first: '$createdAt' },
          paidAt: { $first: '$paidAt' },
          deliveredAt: { $first: '$deliveredAt' },
        },
      },
      {
        $match: { ...searchFilter },
      },
    ]

    const orders = await Order.aggregate([
      ...aggregateOption,
      { $sort: { createdAt: -1 } },
      { $skip: skip || 0 },
      { $limit: 10 },
    ])

    if (!orders || orders.length === 0) {
      res.status(404)
      throw new Error(strings.product[lang].no_order)
    }

    const documentCount = await Order.aggregate([
      ...aggregateOption,
      { $count: 'document_count' },
    ])

    let count = 0

    if (documentCount[0]) {
      count = documentCount[0]['document_count']
    }

    res.json({
      success: true,
      code: 200,
      orders,
      count,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateOrder = async (req, res, next) => {
  const updatedData = req.body
  const { lang } = req.headers

  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      res.status(404)
      throw new Error(strings.product[lang].no_order)
    }
    const allowedKeys = [
      'shippingAddress',
      'paymentResult',
      'isPaid',
      'isDelivery',
    ]
    if (Object.keys(updatedData).length < 1) {
      res.status(400)
      throw new Error(strings.user[lang].require_data)
    }
    for (let key in updatedData) {
      if (allowedKeys.includes(key)) {
        if (key === 'isPaid') {
          order[key] = updatedData[key]
          if (order.isPaid) order.paidAt = new Date()
        } else if (key === 'isDelivery') {
          order[key] = updatedData[key]
          if (order.isDelivery) order.deliveryAt = new Date()
        } else if (updatedData[key]) {
          order[key] = updatedData[key]
        } else {
          res.status(400)
          throw new Error(`please provide a value for ${key}`)
        }
      } else {
        res.status(400)
        throw new Error(`${key} is Unknown, please choose a verified key`)
      }
    }
    await order.save()
    res.json({
      success: true,
      code: 200,
      message: strings.product[lang].order_update,
      order: order._id,
    })
  } catch (error) {
    next(error)
  }
}
