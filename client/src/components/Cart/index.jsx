import React from 'react'
import style from './style.module.scss'
import CartItem from './CartItem'
import { useHistory } from 'react-router'

const Cart = ({process}) => {
  const history = useHistory()
  return (
    <div className={style.cart}>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Quantity</td>
            <td>Total</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, idx) => (
            <CartItem key={idx} />
          ))}
          <tr className={style.cart__footer}>
            <td className={style.cart__footer_continue}>
              <button>Continue Shipping</button>
            </td>
            <td>Total</td>
            <td>
              750<sup>$</sup>
            </td>
            <td>
              {process === 'cart' && (
                <button onClick={() => history.push('/order?process=payment')}>
                  Checkout
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Cart
