import Course from '../models/courseModal.js'
import Product from '../models/productModal.js'
import Coupon from '../models/couponModal.js'
import paypal from '@paypal/checkout-server-sdk'

const Environment =
  process.env.NODE_ENV === 'production'
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
)
export const sendClientId = async (req, res) => {
  const clientId = process.env.PAYPAL_CLIENT_ID
  if (!clientId)
    return res.status(404).send({ message: 'Paypal client id not found' })
  res.send({ paypalClientId: process.env.PAYPAL_CLIENT_ID, success: true })
}

// client will send the
// course id and coupon code,
// items array of objects with _id and quantity of products,
// type=product or course
export const createOrder = async (req, res, next) => {
  const { type } = req.params
  const { items, courseId, coupon } = req.body
  console.log('createOrder ~ items', items)
  let total = 0
  let purchasedItems = []
  let breakdown = {}
  // create order for product
  if (type === 'product') {
    // call db to get price for every product and calculate total
    const products = await Product.find({
      _id: { $in: items.map((item) => item.product) },
    })
    // calculate total
    total = products.reduce((acc, product) => {
      const item = items.find((item) => item.product === product._id.toString())
      return acc + product.price * item.quantity
    }, 0)
    // create purchased items
    purchasedItems = items.map((item) => {
      const product = products.find(
        (prod) => prod._id.toString() === item.product
      )
      return {
        name: product.name,
        unit_amount: {
          currency_code: 'USD',
          value: product.price.toFixed(2),
        },
        quantity: item.quantity,
      }
    })
    // create breakdown
    breakdown = {
      item_total: {
        currency_code: 'USD',
        value: total,
      },
    }
    // create order for course
  } else if (type === 'course') {
    // call db to get price for the course and calculate total
    const course = await Course.findById(courseId)
    let couponDiscount = 0
    // check if coupon is valid
    if (coupon) {
      const isFound = await Coupon.findOne({ code: coupon })
      if (isFound) {
        couponDiscount = isFound.discountPercentage
      }
    }
    const courseDiscountAmount = (course.price * course.discount) / 100
    // calculate total
    total = parseFloat((course.price - courseDiscountAmount).toFixed(2))
    const couponDiscountAmount = (total * couponDiscount) / 100

    total = parseFloat((total - couponDiscountAmount).toFixed(2))

    const overallDiscount = courseDiscountAmount + couponDiscountAmount

    // create purchased items
    purchasedItems = [
      {
        name: course.name,
        unit_amount: {
          currency_code: 'USD',
          value: course.price.toFixed(2),
        },
        quantity: 1,
      },
    ]
    // create breakdown
    breakdown = {
      item_total: {
        currency_code: 'USD',
        value: course.price.toFixed(2),
      },
      discount: {
        currency_code: 'USD',
        value: overallDiscount.toFixed(2),
      },
    }
  }

  //construct the request to send to paypal to create order
  const request = new paypal.orders.OrdersCreateRequest()
  //representation of the order for paypal window to popup properly
  request.prefer('return=representation')
  //construct request body
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: total,
          breakdown: breakdown,
        },
        items: purchasedItems,
      },
    ],
  })
  try {
    const order = await paypalClient.execute(request)
    res.send({ order: { id: order.result.id, total }, success: true })
  } catch (error) {
    console.log('🚀createOrder ~ error', error)
    next(error)
  }
}
