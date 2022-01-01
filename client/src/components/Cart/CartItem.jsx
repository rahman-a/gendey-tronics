import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {CloseSquare} from '../icons'
import Loader from '../Loader'
import actions from '../../actions'
import { useDispatch, useSelector } from 'react-redux'

const CartItem = ({item}) => {
    const dispatch = useDispatch()
    const [loadingState, setLoadingState] = useState(false)
    const {message} = useSelector(state => state.removeItem)
    
    const removeItemHandler = () => {
        setLoadingState(true)
        dispatch(actions.products.removeItem(item._id))
    }
    useEffect(() => {
        message && setLoadingState(false)
    },[message])
    return (
    <tr className={style.cart__item}>
        <td>{item.item.name}</td>
        <td>
           <span>{item.quantity}</span>
        </td>
        <td>
            <span>{item.item.price * item.quantity} $</span>
        </td>
        <td>
            <span onClick={removeItemHandler}
            style={{position:'relative'}}>
                {loadingState
                ?<Loader size='4' center/>
                :<CloseSquare/>
               }
            </span>
        </td>
    </tr>
    )
}

export default CartItem
