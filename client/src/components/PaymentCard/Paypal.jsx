import React, { useEffect, useRef, useState, useCallback } from 'react'
import { loadScript } from '@paypal/paypal-js'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import api from '../../api'

const PaypalCheckout = ({
  type,
  setError,
  cartItems,
  course,
  completeProductPayment,
  completeCoursePayment,
  lang,
  strings,
}) => {
  const [isPaypalLoaded, setIsPaypalLoaded] = useState(false)
  const [total_price, setTotalPrice] = useState(0)
  const dispatch = useDispatch()
  const { clientId } = useSelector((state) => state.getPaypalClientId)
  const { coupon } = useSelector((state) => state.verifyCoupon)
  const paypalButton = useRef(null)
  let orderItems = []

  const extractCartItemsData = () => {
    // Construct items schema for saving in database
    if (type === 'product' && cartItems) {
      orderItems = cartItems.map((item) => {
        return {
          quantity: item.quantity,
          options: item.options,
          product: item.item._id,
        }
      })
    }
  }

  const createOrderHandler = async () => {
    const couponName = coupon?.success ? coupon.coupon : null
    const assets =
      type === 'product'
        ? { items: orderItems }
        : { courseId: course?._id, coupon: couponName }
    const { data } = await api.client.createOrder(type, assets)
    setTotalPrice(data.order.total)
    return data.order.id
  }

  const approvePaymentHandler = (data, actions) => {
    return actions.order.capture().then(function (orderData) {
      // Successful capture! For dev/demo purposes:
      var transaction = orderData.purchase_units[0].payments.captures[0]
      const transaction_data = {
        id: transaction.id,
        status: transaction.status,
        update_time: transaction.update_time,
      }
      const data =
        type === 'product'
          ? {
              orderItems,
              totalPrice: transaction.amount.value,
              paymentResult: transaction_data,
            }
          : null

      type === 'product'
        ? completeProductPayment(data)
        : type === 'course' && completeCoursePayment(transaction.amount.value)
    })
  }

  const onPaymentErrorHandler = (error) => {
    setError(strings.client[lang].went_wrong)
  }

  const onPaymentCancelHandler = (error) => {
    setError(strings.client[lang].payment_cancel)
  }

  const loadPaypalButton = useCallback(() => {
    loadScript({
      'client-id': clientId,
      'disable-funding': 'card',
    })
      .then((paypal) => {
        paypal
          .Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: createOrderHandler,

            // Finalize the transaction after payer approval
            onApprove: approvePaymentHandler,

            // If any error raised
            onError: onPaymentErrorHandler,

            // On cancel the payment window
            onCancel: onPaymentCancelHandler,
          })
          .render(paypalButton.current)
          .catch((error) => {
            console.error('failed to render the PayPal Buttons', error)
          })
      })
      .catch((error) => {
        console.error('failed to load the PayPal JS SDK script', error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  useEffect(() => {
    dispatch(actions.client.getPaypalClientId())
  }, [])

  useEffect(() => {
    extractCartItemsData()
    if ((cartItems || course) && clientId && !isPaypalLoaded) {
      loadPaypalButton()
      setIsPaypalLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, course, clientId])

  return <div ref={paypalButton}></div>
}

export default PaypalCheckout
