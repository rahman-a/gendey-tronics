import React from 'react'
import style from './style.module.scss'
import {CloseSquare} from '../icons'

const CartItem = () => {
    return (
    <tr className={style.cart__item}>
        <td>The Perfect Classic</td>
        <td>
           <span>10</span>
        </td>
        <td>
            <span>123 $</span>
        </td>
        <td>
            <span>
                <CloseSquare/>
            </span>
        </td>
    </tr>
    )
}

export default CartItem
