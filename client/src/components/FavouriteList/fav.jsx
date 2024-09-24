import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { CartPlus, HeartOutline } from '../icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../Loader'

const Fav = ({ product }) => {
  const [loadingState, setLoadingState] = useState(false)
  const history = useHistory()
  const { lang } = useSelector((state) => state.language)
  const { isRemoved } = useSelector((state) => state.removeProductFromWishlist)
  const dispatch = useDispatch()

  const removeProductFromWishlist = () => {
    setLoadingState(true)
    dispatch(actions.products.removeProductFromWishlist(product._id))
  }

  useEffect(() => {
    isRemoved && setLoadingState(false)
  }, [isRemoved])

  useEffect(() => {
    return () => {
      dispatch({ type: constants.product.REMOVE_PRODUCT_FROM_WISHLIST_RESET })
    }
  }, [])

  return (
    <div className={style.favList__fav}>
      <div className={style.favList__product}>
        <HeartOutline />

        <img src={`/api/images/${product.image}`} alt='item' />

        <a href='/product'>{product.name}</a>
      </div>

      <p
        className={`${style.favList__price} 
              ${lang === 'ar' ? style.favList__price_ar : ''}`}
      >
        {product.price}
        <sup>$</sup>
      </p>

      <span
        className={lang === 'ar' ? style.favList__fav_cart : ''}
        onClick={() => history.push(`/product/${product._id}`)}
      >
        <CartPlus className={style.favList__fav_icon} />
      </span>

      <button
        className={`${style.favList__fav_action} 
            ${lang === 'ar' ? style.favList__fav_ar_action : ''}`}
        onClick={removeProductFromWishlist}
      >
        {loadingState ? <Loader size='4' center /> : 'X'}
      </button>
    </div>
  )
}

export default Fav
