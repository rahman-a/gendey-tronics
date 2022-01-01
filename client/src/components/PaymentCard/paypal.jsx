import React, {useEffect, useRef} from "react";


const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID

const PaypalCheckout = ({
    type, 
    setError, 
    cartItems, 
    course, 
    completeProductPayment, 
    completeCoursePayment,
    lang, strings}) => {
    
    const paypalButton = useRef(null)
    let total_price = 0
    let items = []
    let orderItems = []
    
    const calculateTotalPrice = () => {
        total_price = type === 'product' && cartItems ? cartItems.reduce((acc, item) => {
            return acc + item.item.price * item.quantity
          },0)
          : type === 'course' && course 
          && Math.round(course.price - (course.price * course.discount / 100)).toFixed(2)
    }

    const extractCartItemsData = () => {
        // Construct items schema for paypal order
        items = type === 'product' && cartItems 
        ? cartItems.map(item => {
            return {
                name:item.item.name,
                unit_amount:{
                    currency_code:'USD',
                    value:item.item.price 
                },
                quantity:item.quantity
            }
        }) 
        : type === 'course' && course && [{
            name:course.name,
            unit_amount:{
                currency_code:'USD',
                value:course.price,
            },
            quantity:1
        }]
        // Construct items schema for saving in database
        if(type === 'product' && cartItems){
            orderItems = cartItems.map(item => {
                return {
                  quantity:item.quantity,
                  options:item.options,
                  product:item.item._id,
                }
              })
        }
        console.log('ITEMS', items);
    }
    const payment_breakdown = () => {
        const breakdown  = {
            item_total :{
                currency_code:'USD',
                value:type === 'product' ? total_price : type === 'course' && course.price
            }
        }
        if(type === 'course') {
            breakdown.discount = {
                currency_code:'USD', 
                value:Math.round(course.price * course.discount  / 100).toFixed(2)
            }
        } 
        return breakdown
    }
    
    const createOrderHandler = (data, actions) => {
        console.log('Products Items', items);
        return actions.order.create({
            purchase_units: [{
                amount: {
                currency_code:'USD',
                value: total_price,
                breakdown:payment_breakdown()
              },
              items
            }]
          });
    }

    const approvePaymentHandler = (data, actions) => {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For dev/demo purposes:
                var transaction = orderData.purchase_units[0].payments.captures[0];
                const transaction_data = {
                    id:transaction.id,
                    status:transaction.status,
                    update_time:transaction.update_time
                }
                const data = type === 'product' 
                ?{
                    orderItems,
                    totalPrice:total_price,
                    paymentResult:transaction_data
                } : null
                
                type === 'product'
                ? completeProductPayment(data)
                :type === 'course' && completeCoursePayment()
          });
    }

    const onPaymentErrorHandler = (error) => {
        setError(strings.client[lang].went_wrong)
        console.log(error);
    }

    const onPaymentCancelHandler = (error) => {
        setError(strings.client[lang].payment_cancel)
    }
    
    const loadPaypalButton = () => {
        window.paypal.Buttons({
            
            // Sets up the transaction when a payment button is clicked
            createOrder: createOrderHandler,
            
            // Finalize the transaction after payer approval
            onApprove: approvePaymentHandler,

            // If any error raised
            onError:onPaymentErrorHandler,

            // On cancel the payment window
            onCancel:onPaymentCancelHandler

          }).render(paypalButton.current);
    }
    
    const createPaypalScript = () => {
        clearScript()
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
        script.id = 'payment-script'
        script.async = true
        script.onload = () => loadPaypalButton()
        document.body.appendChild(script)
    }

    const clearScript = () => {
        const script = document.getElementById('payment-script')
        script && document.body.removeChild(script)
    }
    useEffect(() => {
        extractCartItemsData()
        calculateTotalPrice()
        if(cartItems || course) createPaypalScript() 
        return () => clearScript()
    },[cartItems, course])

    
    return <div ref={paypalButton}></div>
}
 
export default PaypalCheckout;