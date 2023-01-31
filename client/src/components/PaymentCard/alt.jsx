// import React, { useState, useEffect } from 'react'
// import style from './style.module.scss'
// import { Mastercard, Visa, Paypal, PaypalText, ChevronDown } from '../icons'
// import Loader from '../Loader'
// import { Link } from 'react-router-dom'
// import {months, years} from './date'
// import {useHistory, useParams, useLocation} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import constants from '../../constants'
// import actions from '../../actions'

// const PaymentCard = ({type}) => {
//   const [paymentOption, setPaymentOption] = useState('pp')
//   const [formError, setFormError] = useState(null)
//   const [itemsPrice, setITemsPrice] = useState(null)
//   const [paymentInfo, setPaymentInfo] = useState({})
//   const [isAgreeTerm, setIsAgreeTerm] = useState(true)
//   const path = useLocation().pathname
//   const {items} =  useSelector(state => state.cartItems)
//   const {loading, error, order} = useSelector(state => state.newOrder)
//   const {error:error_cart, message:clearCart} = useSelector(state => state.clearCart)
//   const {id} = useParams()
//   const dispatch = useDispatch()
//   const history = useHistory()

//   // Capture Errors and Display it
//   const setError = error => {
//     setFormError(error)
//     setTimeout(() => {
//       setFormError(null)
//     }, 5000)
//   }

//   // Form Validation
//   const isFormValidated = (_) => {
//     const paymentData = Object.keys(paymentInfo)
//     const requiredData = {
//       cardName:'Card Holder Name',
//       cardNumber:'Card Number',
//       expiryMonth:'Expiration Month',
//       expiryYear:'Expiration Year',
//       cvv:'CVV number'}
//     if (paymentData.length === 0) {
//       setError('Please Provide the Required Data')
//       return false
//     }
//     for(let key in requiredData) {
//       if(!(paymentData.includes(key))) {
//         setError(`please provide the ${requiredData[key]}`)
//         return false
//       }
//     }
//     if(!isAgreeTerm) {
//       setError('Please Agree the Sales Terms')
//       return false
//     }
//     return true
//   }

//   // Capture Payment Details
//   const getPaymentInfoHandler = (e) => {
//     const value = { [e.target.name]: e.target.value }
//     setPaymentInfo({ ...paymentInfo, ...value })
//   }

//   // complete Course Payment
//   const completeCoursePayment = _ => {
//     dispatch({type:constants.courses.GET_ONE_RESET})
//     history.push(`/course/${id}/learn#overview`)
//   }

//   // complete Product Payment
//   const completeProductPayment = () => {
//     dispatch({type: constants.product.CREATE_ORDER_RESET})
//     const totalPrice = items.reduce((acc, item) => {
//       return acc + item.item.price
//     },0)
//     const paymentType = {
//       pp:'paypal',
//       mc:'mastercard',
//       vc:'visa card'
//     }
//     setITemsPrice(totalPrice)
//     const orderItems = items.map(item => {
//       return {
//         quantity:item.quantity,
//         options:item.options,
//         product:item.item._id,
//         paymentMethod:paymentType[paymentOption]
//       }
//     })

//     const order = {
//       orderItems,
//       totalPrice
//     }

//     dispatch(actions.products.newOrder(order))
//   }

//   // submit Form
//   const submitFormHandler = (e) => {
//     e.preventDefault()
//     setFormError(null)
//     // isFormValidated()
//     if (true) {
//       if(type === 'course'){
//         completeCoursePayment()
//       }
//       if(type === 'product') {
//         completeProductPayment()
//       }
//     }
//   }

//   useEffect(() => {
//     if(order && items) {
//       dispatch(actions.products.clearCart())
//     }
//     error && setError(error)
//     error_cart && setError(error_cart)
//     clearCart && history.push(`${path}?process=delivery`)
//   }, [order, history, path, error, dispatch, clearCart, error_cart])

//   return (
//     <div className={style.coursePayment__payment}>
//       <div
//         className={style.coursePayment__error}
//         style={{ top: formError ? '5%' : '-10%', opacity:formError ? '1' : '0' }}
//       >
//         <span>!</span> {formError}
//         <div
//           className={`${style.coursePayment__error_progress}
//             ${
//               formError
//                 ? style.coursePayment__error_expand
//                 : style.coursePayment__error_collapse
//             }`}
//         ></div>
//       </div>
//       <div className={style.coursePayment__payment_wrapper}>
//         <div className={style.coursePayment__options}>
//           <p>Payment Information</p>
//           <div className={style.coursePayment__options_icons}>
//             <span
//               className={style.coursePayment__options_mc}
//               style={{ opacity: paymentOption === 'mc' ? '1' : '0.3' }}
//               onClick={() => setPaymentOption('mc')}
//             >
//               <Mastercard />
//               <span style={{ opacity: paymentOption === 'mc' ? '1' : '0.3' }}>
//                 mastercard
//               </span>
//             </span>
//             <span
//               onClick={() => setPaymentOption('vs')}
//               style={{ opacity: paymentOption === 'vs' ? '1' : '0.3' }}
//             >
//               <Visa />
//             </span>
//             <span
//               onClick={() => setPaymentOption('pp')}
//               style={{ opacity: paymentOption === 'pp' ? '1' : '0.3' }}
//             >
//               <Paypal style={{ width: '3rem' }} />
//               <PaypalText />
//             </span>
//           </div>
//         </div>
//         <form onSubmit={submitFormHandler}>
//           <div className={style.coursePayment__data}>
//             <label htmlFor='cardName'>Name</label>
//             <input
//               type='text'
//               id='cardName'
//               name='cardName'
//               onChange={getPaymentInfoHandler}
//               placeholder='Card holder name'
//             />
//           </div>
//           <div className={style.coursePayment__data}>
//             <label htmlFor='cardNumber'>Card Number</label>
//             <input
//               type='text'
//               id='cardNumber'
//               name='cardNumber'
//               onChange={getPaymentInfoHandler}
//               placeholder='Card number'
//             />
//           </div>
//           <div className={style.coursePayment__info}>
//             <div className={style.coursePayment__expiry}>
//               <p>Expiry</p>
//               <div className={style.coursePayment__expiry_wrapper}>
//                 <div
//                   className={`${style.coursePayment__data} ${style.coursePayment__info_data}`}
//                 >
//                   <div className={style.coursePayment__select}>
//                     <span>
//                       <ChevronDown />
//                     </span>
//                     <select
//                       name='expiryMonth'
//                       id='cardNumber'
//                       onChange={getPaymentInfoHandler}
//                     >
//                       {months.map((month) => (
//                         <option value={month.name}>{month.abbr}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div
//                   className={`${style.coursePayment__data} ${style.coursePayment__info_data}`}
//                 >
//                   <div className={style.coursePayment__select}>
//                     <span>
//                       <ChevronDown />
//                     </span>
//                     <select
//                       name='expiryYear'
//                       id='cardNumber'
//                       onChange={getPaymentInfoHandler}
//                     >
//                       {years.map((year) => (
//                         <option value={year}>{year}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className={style.coursePayment__data}
//               style={{ width: '5rem' }}
//             >
//               <p>CVV</p>
//               <input
//                 type='text'
//                 placeholder='CVV'
//                 defaultValue='955'
//                 name='cvv'
//                 onChange={getPaymentInfoHandler}
//               />
//             </div>
//           </div>
//           <div className={style.coursePayment__terms}>
//             <input
//               type='checkbox'
//               id='agreeTerms'
//               checked={isAgreeTerm}
//               name='isAgreed'
//               onChange={() => setIsAgreeTerm((prev) => !prev)}
//             />
//             <label htmlFor='agreeTerms'>
//               I Accept all <Link to='/sales-terms'>sales terms</Link>
//             </label>
//           </div>
//           <button type='submit' className={style.coursePayment__complete}
//           style={{padding: loading ? '2rem': '1rem 1.5rem'}}>
//             { loading ? <Loader size='4' center/>
//               :type === 'course' ? 'complete payment' : 'BUY NOW'
//             }
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default PaymentCard
