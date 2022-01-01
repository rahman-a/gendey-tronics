import React, {useEffect} from 'react'
import style from './style.module.scss'
import CartItem from './CartItem'
import { useHistory } from 'react-router'
import {useSelector, useDispatch} from 'react-redux'
import constants from '../../constants'
import Loader from '../Loader'
import strings from '../../localization'

const Cart = ({process}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {items}  = useSelector(state => state.cartItems)
  const {message} = useSelector(state => state.removeItem)
  const {loading} = useSelector(state => state.cartItems)
  const {lang} = useSelector(state => state.language)
  
  useEffect(() => {
    message 
    && items
    && items.length < 2
    && dispatch({type:constants.product.LIST_CART_ITEMS_RESET})
  },[message])

  return (
    <div className={style.cart}
    style={{padding: loading ? '15rem' : '0' , position:'relative'}}>
      {loading 
      ? <Loader size='20' center/>
      :items
      ?<table>
        <thead>
          <tr>
            <td>{strings.product[lang].item}</td>
            <td>{strings.product[lang].qty}</td>
            <td>{strings.product[lang].total}</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {items && items.map(item => (
            <CartItem key={item._id} item={item}/>
          ))}
          <tr className={style.cart__footer}>
            <td className={style.cart__footer_continue}>
              <button onClick={() => history.push('/')}>{strings.product[lang].continue_shopping}</button>
            </td>
            <td>{strings.product[lang].total}</td>
            <td>
              {
                items && items.reduce((acc, item) => {
                  return acc + (item.item.price * item.quantity)
                },0)
              }<sup>$</sup>
            </td>
            <td>
              {process === 'cart' && (
                <button onClick={() => history.push('/order?process=payment')}>
                  {strings.product[lang].checkout}
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      : <div style={{
        textAlign:'center',
        fontWeight:'100',
        fontSize:'3rem',
        fontFamily:lang === 'en' ? 'Montserrat' :'Cairo'
      }}>
          <img src="/images/empty-cart.png" alt="Empty Cart" />
          <p>{strings.product[lang].no_items}</p>
        </div>}
    </div>
  )
}

export default Cart
