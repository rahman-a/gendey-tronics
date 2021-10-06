import React from 'react'
import style from './style.module.scss'
import CartItem from './CartItem'

const Cart = ({process, setProcess}) => {
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
                   {
                       [...Array(6)].map((_, idx) => <CartItem key={idx}/>)
                   }
                   <tr className={style.cart__footer}>
                       <td>     
                           <button>Continue Shipping</button>
                       </td>
                       <td>
                           Total
                       </td>
                       <td>
                           750<sup>$</sup>
                       </td>
                       <td>
                          {process === 'cart' 
                          && <button onClick={() => setProcess('payment')}>Checkout</button>}
                       </td>
                   </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Cart
