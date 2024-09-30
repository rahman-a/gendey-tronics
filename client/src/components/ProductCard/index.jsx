import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import actions from '../../actions'
import { Plus } from '../icons'
import Loader from '../Loader'
import { ShoppingCart } from '../../components/icons'
import strings from '../../localization'
import constants, { API_URL } from '../../constants'
let count = 0

const ProductCard = ({ card }) => {
  const [messagePosition, setMessagePosition] = useState(-15)
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const { lang } = useSelector((state) => state.language)
  const { message } = useSelector((state) => state.newItem)

  const dispatch = useDispatch()

  const reformType = (type) => {
    return type.split(' ').join('-')
  }
  const addToCartHandler = () => {
    setIsLoading(true)
    const data = {
      item: card._id,
      quantity: 1,
      options: [],
    }

    dispatch(actions.products.newItem(data))
  }
  useEffect(() => {
    if (message && isLoading) {
      setIsLoading(false)
      setMessagePosition(1)
      setTimeout(() => {
        setMessagePosition(-15)
        dispatch({ type: constants.product.ADD_ITEM_TO_CART_RESET })
      }, 3500)
      count++
    }
  }, [message])

  return (
    <div className={style.productCard}>
      <p
        className={style.productCard__addToCart}
        style={{ top: `${messagePosition}rem` }}
      >
        <span style={{ color: 'green' }}>
          {' '}
          <ShoppingCart />{' '}
        </span>
        {strings.product[lang].item_added_to_cart}
      </p>
      <figure>
        <img
          src={
            card.images?.length
              ? `${API_URL}/images/${card.images[0]?.src}`
              : card.image
              ? `${API_URL}/images/${card.image}`
              : 'images/no-image.jpg'
          }
          alt='product'
        />
      </figure>
      <div className={style.productCard__option}>
        <p>${card.price}</p>
        <h3>{card.name}</h3>
        <div
          className={`${style.productCard__cta} ${
            lang === 'ar' ? style.productCard__cta_ar : ''
          }`}
        >
          <button
            onClick={() =>
              history.push(`/product/${card._id}?type=${reformType(card.type)}`)
            }
          >
            {strings.product[lang].details}
          </button>
          <button onClick={addToCartHandler} disabled={isLoading}>
            {strings.product[lang].cart}
            {isLoading ? (
              <Loader
                size='1'
                custom={{ padding: 0, transform: 'translateY(-2px)' }}
              />
            ) : (
              <span>
                {' '}
                <Plus />{' '}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
