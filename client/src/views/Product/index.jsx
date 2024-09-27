import React, { useRef, useState, useEffect } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars-2'
import style from './style.module.scss'
import Template from '../../components/Template'
import CardSlider from '../../components/CardSlider'
import ProductCard from '../../components/ProductCard'
import {
  PhoneAlt,
  ShoppingCart,
  Wishlist,
  Schedule,
} from '../../components/icons'
import { Modal } from '../../components/Modal'
import Options from './options'
import Contact from './contant'
import Call from './call'
import PhoneNumber from './phoneNumber'
import Calender from '../../components/Calender'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import ImagesGallery from './Images'
import strings from '../../localization'
import CardsContainer from '../../components/CardsContainer'

const Product = () => {
  const [qty, setQty] = useState(1)
  const [inStock, setInStock] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const containerRef = useRef(null)
  const [actionType, setActionType] = useState('')
  const [contactType, setContactType] = useState('calender')
  const [productOptions, setProductOptions] = useState([])
  const [callDate, setCallDate] = useState('')
  const [callMethod, setCallMethod] = useState('')
  const [callPhone, setCallPhone] = useState('')
  const [imgSrc, setImgSrc] = useState(null)
  const [isGallery, setIsGallery] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const type = new URLSearchParams(useLocation().search).get('type')
  const path = useLocation().pathname
  const dispatch = useDispatch()
  const { isAuth, info } = useSelector((state) => state.client)
  const { lang } = useSelector((state) => state.language)
  const { loading, error, product } = useSelector((state) => state.productData)
  const {
    loading: loading_p,
    error: error_p,
    products,
  } = useSelector((state) => state.listProducts)
  const { loading: loading_a, isAdded } = useSelector(
    (state) => state.addProductToWishlist
  )
  const { loading: loading_r, isRemoved } = useSelector(
    (state) => state.removeProductFromWishlist
  )
  const {
    loading: call_loading,
    error: call_error,
    message,
  } = useSelector((state) => state.bookCall)

  const { loading: item_loading, message: item_message } = useSelector(
    (state) => state.newItem
  )

  const defineQty = (action) => {
    if (action === 'increment') {
      if (qty < inStock) setQty(qty + 1)
    } else if (action === 'decrement') {
      if (qty > 1) {
        setQty(qty - 1)
      }
    }
  }
  const setActionTypeHandler = (action) => {
    setToggle(true)
    setActionType(action)
  }

  const toggleProductWishlist = () => {
    const redirect = `${path}?type=${type}`
    if (!isAuth) {
      history.push(`/login?redirect=${redirect}`)
      return
    }
    dispatch({ type: constants.product.ADD_PRODUCT_TO_WISHLIST_RESET })
    dispatch({ type: constants.product.REMOVE_PRODUCT_FROM_WISHLIST_RESET })
    isFavourite
      ? dispatch(actions.products.removeProductFromWishlist(product._id))
      : dispatch(
          actions.products.addProductToWishlist({
            itemType: 'product',
            item: product._id,
          })
        )
  }

  const showProductOptions = () => {
    const redirect = `${path}?type=${type}`
    if (!isAuth) {
      history.push(`/login?redirect=${redirect}`)
      return
    }
    product.options.length ? setActionTypeHandler('option') : addToCartHandler()
  }

  const ActivateBookingHandler = () => {
    const redirect = `${path}?type=${type}`
    if (!isAuth) {
      history.push(`/login?redirect=${redirect}`)
      return
    }
    setActionTypeHandler('contact')
  }

  const addToCartHandler = () => {
    const data = {
      item: product._id,
      quantity: qty,
      options: productOptions,
    }
    dispatch(actions.products.newItem(data))
  }

  const BookCallHandler = () => {
    const bookingInfo = {
      product: id,
      date: callDate,
      method: callMethod,
      phone: callPhone,
    }
    if (info) {
      bookingInfo.user = info._id
    }
    dispatch(actions.products.bookCall(bookingInfo))
    setContactType('done')
  }

  useEffect(() => {
    if (product) {
      setInStock(product.quantity)
      setIsFavourite(product.isFav)
      setImgSrc(product.images[0]?.src)
    }
    isAdded && setIsFavourite(true)
    isRemoved && setIsFavourite(false)
  }, [product, isAdded, isRemoved])

  useEffect(() => {
    if (contactType === 'done') {
      setTimeout(() => {
        setToggle(false)
      }, 2000)
    }
    if (id) {
      isAuth
        ? dispatch(actions.products.ProductData(id))
        : dispatch(actions.products.ProductData(id, 'public'))
    }
    type && dispatch(actions.products.listProducts(type))
    return () => {
      dispatch({ type: constants.product.ADD_PRODUCT_TO_WISHLIST_RESET })
      dispatch({ type: constants.product.REMOVE_PRODUCT_FROM_WISHLIST_RESET })
    }
  }, [id, type, dispatch, isAuth])

  return (
    <Template>
      <Modal
        toggle={toggle}
        closeHandler={() => setToggle(false)}
        styling={{ boxShadow: '-1px 1px 11px 0px rgb(0 0 0 / 50%)' }}
      >
        {actionType === 'option' ? (
          <Options
            options={product.options}
            setOptions={setProductOptions}
            addToCart={addToCartHandler}
            setToggle={setToggle}
            lang={lang}
          />
        ) : actionType === 'call' ? (
          <Call />
        ) : (
          actionType === 'contact' && (
            <>
              {contactType === 'option' ? (
                <Contact
                  setContactType={setContactType}
                  setCallMethod={setCallMethod}
                  callMethod={callMethod}
                  lang={lang}
                />
              ) : contactType === 'phone' ? (
                <PhoneNumber
                  setContactType={setContactType}
                  setCallPhone={setCallPhone}
                  callPhone={callPhone}
                  BookCallHandler={BookCallHandler}
                  lang={lang}
                />
              ) : contactType === 'calender' ? (
                <Calender
                  setContactType={setContactType}
                  setCallDate={setCallDate}
                  lang={lang}
                />
              ) : (
                contactType === 'done' && (
                  <div className={style.product__done}>
                    {call_loading ? (
                      <Loader size='15' center />
                    ) : call_error ? (
                      <Message
                        type='error'
                        size='3'
                        center
                        message={call_error}
                      />
                    ) : (
                      message && <span>DONE</span>
                    )}
                  </div>
                )
              )}
            </>
          )
        )}
      </Modal>

      <ImagesGallery
        isGallery={isGallery}
        setIsGallery={setIsGallery}
        images={product?.images}
        name={product?.name}
      />

      <div className={style.product}>
        <div
          className={style.product__overlay}
          style={{ transform: toggle ? 'scale(1)' : 'scale(0)' }}
        ></div>
        <div
          className='container'
          style={{ height: loading ? '30rem' : 'auto' }}
        >
          <div className={style.product__wrapper}>
            {loading ? (
              <Loader size='25' center custom={{ color: '#F8C600' }}>
                <p>{strings.product[lang].product_load}</p>
              </Loader>
            ) : error ? (
              <Message size='5' type='error' message={error} />
            ) : (
              product && (
                <>
                  <div className={style.product__content}>
                    <div className={style.product__details}>
                      <Scrollbars
                        className={`${style.product__thumbnails} ${
                          lang === 'ar' ? style.product__thumbnails_ar : ''
                        }`}
                      >
                        {product &&
                          product.images.map((image) => (
                            <img
                              onClick={(e) => setImgSrc(image.src)}
                              src={`${import.meta.env.VITE_API_URL}/images/${
                                image.src
                              }`}
                              alt='product'
                              key={image._id}
                            />
                          ))}
                      </Scrollbars>
                      <figure>
                        <img
                          src={
                            imgSrc
                              ? `${
                                  import.meta.env.VITE_API_URL
                                }/images/${imgSrc}`
                              : '/images/no-image.jpg'
                          }
                          alt='product file'
                          onClick={() => setIsGallery(true)}
                        />
                      </figure>
                      <div className={style.product__desc}>
                        <h2>{strings.product[lang].description}</h2>
                        <p>{product.description}</p>
                      </div>
                    </div>
                    <div
                      className={`${style.product__action} ${
                        lang === 'ar' ? style.product__action_ar : ''
                      }`}
                    >
                      <div className={style.product__title}>
                        <h1>{product.name}</h1>
                        <span>{product.short}</span>
                      </div>
                      <div className={style.product__info}>
                        <div
                          className={`${style.product__stock} 
                                    ${
                                      lang === 'ar'
                                        ? style.product__stock_ar
                                        : ''
                                    }`}
                        >
                          <p>{strings.product[lang].stock}</p>
                          <p>{product.quantity}</p>
                        </div>
                        <div
                          className={`${style.product__qty} 
                                    ${
                                      lang === 'ar' ? style.product__qty_ar : ''
                                    }`}
                        >
                          <p>{strings.product[lang].qty}</p>
                          <div className={style.product__qty_action}>
                            <button onClick={() => defineQty('decrement')}>
                              -
                            </button>
                            <span>{qty}</span>
                            <button onClick={() => defineQty('increment')}>
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          className={`${style.product__price} 
                                    ${
                                      lang === 'ar'
                                        ? style.product__price_ar
                                        : ''
                                    }`}
                        >
                          <p
                            style={{
                              marginLeft: lang === 'ar' ? '6rem' : 'unset',
                            }}
                          >
                            {strings.product[lang].price}
                          </p>
                          <p>
                            {product.price}
                            <sup>$</sup>
                          </p>
                        </div>
                      </div>
                      <div
                        className={`${style.product__cta} 
                                    ${
                                      lang === 'ar' ? style.product__cta_ar : ''
                                    }`}
                      >
                        <div className={style.product__cta_add}>
                          <button
                            className={style.product__cta_gray}
                            onClick={showProductOptions}
                            disabled={item_loading ? true : false}
                          >
                            {item_loading ? (
                              <Loader
                                size='4'
                                center
                                custom={{ left: '25%', top: '47%' }}
                              />
                            ) : (
                              <ShoppingCart />
                            )}
                            {strings.product[lang].cart}
                          </button>
                          <button
                            className={style.product__cta_yellow}
                            style={{
                              alignItems: 'center',
                              position: 'relative',
                            }}
                            onClick={toggleProductWishlist}
                          >
                            {loading_a || loading_r ? (
                              <Loader
                                size='4'
                                center
                                custom={{ left: '25%', top: '47%' }}
                              />
                            ) : (
                              <Wishlist />
                            )}
                            {isFavourite
                              ? strings.product[lang].removeWishlist
                              : strings.product[lang].addWishlist}
                          </button>
                        </div>
                        <div className={style.product__cta_call}>
                          <button
                            className={style.product__cta_gray}
                            onClick={() => setActionTypeHandler('call')}
                          >
                            <PhoneAlt /> {strings.product[lang].call}
                          </button>
                          <button
                            className={style.product__cta_yellow}
                            onClick={ActivateBookingHandler}
                          >
                            <Schedule /> {strings.product[lang].book}
                          </button>
                        </div>
                      </div>
                      <div className={style.product__video}>
                        {product.video ? (
                          <iframe
                            className={style.product__video_frame}
                            src={product.video}
                            title={product.name}
                            frameborder='0'
                            allow='accelerometer; 
                                    autoplay; 
                                    clipboard-write; 
                                    encrypted-media; 
                                    gyroscope; 
                                    picture-in-picture'
                            allowfullscreen
                          ></iframe>
                        ) : (
                          <img
                            src='/images/no-video.jpg'
                            alt='no video available'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={style.product__related}
                    ref={containerRef}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: loading_p ? '25rem' : error_p ? '10rem' : 'auto',
                    }}
                  >
                    {loading_p ? (
                      <Loader size='25' center />
                    ) : error_p ? (
                      <Message type='error' size='3rem' message={error_p} />
                    ) : (
                      products && (
                        <CardsContainer title='Related Products'>
                          {products.map((product) => (
                            <ProductCard card={product} key={product._id} />
                          ))}
                        </CardsContainer>
                      )
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </Template>
  )
}

export default Product
