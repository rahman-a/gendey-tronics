import React, {useRef, useState, useEffect} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CardSlider from '../../components/CardSlider'
import ProductCard from '../../components/ProductCard'
import {PhoneAlt, ShoppingCart, Wishlist, Schedule} from '../../components/icons'
import {Modal} from '../../components/Modal'
import Options from './options'
import Contact from './contant'
import Call from './call'
import PhoneNumber from './phoneNumber'
import Calender from '../../components/Calender'
import { useParams, useLocation, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import strings from '../../localization'

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
    const {id}  = useParams()
    const history = useHistory()
    const type = new URLSearchParams(useLocation().search).get('type')
    const path = useLocation().pathname
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.client)
    const {lang} = useSelector(state => state.language)
    const {loading, error, product} = useSelector(state => state.productData)
    const {loading:loading_p, error:error_p, products} = useSelector(state => state.listProducts)
    const {loading:loading_a, isAdded} = useSelector(state => state.addProductToWishlist)
    const {loading:loading_r, isRemoved} = useSelector(state => state.removeProductFromWishlist)
    const {loading:call_loading, error:call_error, message} = useSelector(state => state.bookCall)
    
    const defineQty = action => {
        if(action === 'increment') {
            if(qty < inStock)
            setQty(qty + 1)
        }else if(action === 'decrement'){
            if(qty > 1){
                setQty(qty - 1)
            }
        }
    }
    const setActionTypeHandler = action => {
        setToggle(true)
        setActionType(action)
    }

    const toggleProductWishlist = () => {
        const redirect = `${path}?type=${type}`
        if(!isAuth) {
            history.push(`/login?redirect=${redirect}`)
            return
        }
        dispatch({type:constants.product.ADD_PRODUCT_TO_WISHLIST_RESET})
        dispatch({type:constants.product.REMOVE_PRODUCT_FROM_WISHLIST_RESET})
        isFavourite
        ? dispatch(actions.products.removeProductFromWishlist(product._id))
        : dispatch(actions.products.addProductToWishlist({itemType:'product', item:product._id}))
    }

    const showProductOptions = () => {
        const redirect = `${path}?type=${type}`
        if(!isAuth) {
            history.push(`/login?redirect=${redirect}`)
            return
        }
        setActionTypeHandler('option')
    }
     
    const ActivateBookingHandler  = () => {
        const redirect = `${path}?type=${type}`
        if(!isAuth) {
            history.push(`/login?redirect=${redirect}`)
            return
        }
        setActionTypeHandler('contact')
    }

    const addToCartHandler = () => {
        const data = {
            item:product._id,
            quantity:qty,
            options: productOptions
        }
        dispatch(actions.products.newItem(data))
    }

    const BookCallHandler = () => {
        const bookingInfo = {
            product:id,
            date:callDate,
            method:callMethod,
            phone:callPhone
        }
        dispatch(actions.products.bookCall(bookingInfo))
        setContactType('done')
    }
    
    useEffect(() => {
        product && setInStock(product.quantity)
        product && setIsFavourite(product.isFav)
        isAdded && setIsFavourite(true)
        isRemoved && setIsFavourite(false)
    },[product, isAdded, isRemoved])
    
    useEffect(() => {
        if(contactType === 'done'){
            setTimeout(() => {
                setToggle(false)
            }, 2000);
        }
        if(id){
            isAuth 
            ? dispatch(actions.products.ProductData(id))
            : dispatch(actions.products.ProductData(id, 'public'))
        } 
        type && dispatch(actions.products.listProducts(type))
        return () => {
           dispatch({type:constants.product.ADD_PRODUCT_TO_WISHLIST_RESET})
           dispatch({type:constants.product.REMOVE_PRODUCT_FROM_WISHLIST_RESET})
        }
    }, [id, type, dispatch, isAuth])

    return (
        <Template>
            <Modal toggle={toggle} 
            closeHandler={() => setToggle(false)}
            styling={{boxShadow:'-1px 1px 11px 0px rgb(0 0 0 / 50%)'}}>
                {
                actionType === 'option'
                    ?<Options 
                    options={product.options}
                    setOptions={setProductOptions}
                    addToCart={addToCartHandler}
                    setToggle={setToggle}
                    lang={lang}/>
                    : actionType === 'call' 
                    ? <Call/>
                        : actionType === 'contact' 
                        &&
                        <>
                        {
                        contactType === 'option'
                            ?<Contact 
                            setContactType={setContactType}
                            setCallMethod={setCallMethod}
                            callMethod={callMethod}
                            lang={lang}/>
                        :contactType === 'phone' 
                            ?<PhoneNumber 
                            setContactType={setContactType}
                            setCallPhone={setCallPhone}
                            callPhone={callPhone}
                            BookCallHandler={BookCallHandler}
                            lang={lang}/>
                        :contactType === 'calender'
                            ?<Calender 
                            setContactType={setContactType}
                            setCallDate={setCallDate}
                            lang={lang}/>
                        :contactType === 'done' 
                            &&<div className={style.product__done}>
                                {call_loading 
                                ? <Loader size='15' center/>
                                :call_error 
                                ? <Message type='error' size='3' center message={call_error}/>
                                :message && <span>DONE</span>}
                            </div>
                        }
                </>}
            </Modal>
            <div className={style.product}>
            <div className={style.product__overlay}
            style={{transform:toggle ? 'scale(1)': 'scale(0)'}}></div>
               <div className="container" style={{height:loading ? '30rem' : 'auto'}}>
                   <div className={style.product__wrapper}>
                       {loading
                       ? <Loader size='25' center custom={{color:'#F8C600'}}>
                           <p>{strings.product[lang].product_load}</p>
                       </Loader>
                       : error 
                       ? <Message size='5' type='error' message={error}/> 
                       :product && <><div className={style.product__content}>
                            <div className={style.product__details}>
                                <figure>
                                    <img src={
                                        product.image 
                                        ? `/api/images/${product.image}` 
                                        :'/images/no-image.jpg'
                                    } alt="product file" />
                                </figure>
                                <div className={style.product__desc}>
                                    <h2>{strings.product[lang].description}</h2>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                            <div className={style.product__action}>
                                <div className={style.product__title}>
                                    <h1>{product.name}</h1>
                                    <span>{product.short}</span>
                                </div>
                                <div className={style.product__info}>
                                    <div className={`${style.product__stock} 
                                    ${lang === 'ar' ? style.product__stock_ar :''}`}>
                                        <p>{strings.product[lang].stock}</p>
                                        <p>{product.quantity}</p>
                                    </div>
                                    <div className={`${style.product__qty} 
                                    ${lang === 'ar' ? style.product__qty_ar :''}`}>
                                        <p>{strings.product[lang].qty}</p>
                                        <div className={style.product__qty_action}>
                                            <button onClick={() => defineQty('decrement')}>-</button>
                                            <span>{qty}</span>
                                            <button onClick={() => defineQty('increment')}>+</button>
                                        </div>
                                    </div>
                                    <div className={`${style.product__price} 
                                    ${lang === 'ar' ? style.product__price_ar :''}`}>
                                        <p style={{marginLeft:lang === 'ar' ? '6rem' :'unset'}}
                                        >{strings.product[lang].price}</p>
                                        <p>{product.price}<sup>$</sup></p>
                                    </div>
                               </div>
                               <div className={`${style.product__cta} 
                                    ${lang === 'ar' ? style.product__cta_ar :''}`}>
                                   <div className={style.product__cta_add}>
                                       <button className={style.product__cta_gray}
                                       onClick={showProductOptions}> 
                                            <ShoppingCart/> {strings.product[lang].cart}
                                       </button>
                                       <button className={style.product__cta_yellow}
                                       style={{alignItems:'center', position:'relative'}}
                                       onClick={toggleProductWishlist}> 
                                            {(loading_a || loading_r) 
                                            ? <Loader size='4' center custom={{left:'10%'}}/> 
                                            : <Wishlist/>}
                                            {isFavourite 
                                            ? strings.product[lang].removeWishlist 
                                            : strings.product[lang].addWishlist}
                                       </button>
                                   </div>
                                   <div className={style.product__cta_call}>
                                       <button className={style.product__cta_gray}
                                       onClick={() => setActionTypeHandler('call')}>
                                           <PhoneAlt/> {strings.product[lang].call}
                                        </button>
                                       <button className={style.product__cta_yellow}
                                       onClick={ActivateBookingHandler}>
                                           <Schedule/> {strings.product[lang].book}
                                        </button>
                                   </div>
                               </div>
                               <div className={style.product__video}>
                               {product.video 
                                    ? <iframe
                                    className={style.product__video_frame}
                                    src={product.video} 
                                    title={product.name}
                                    frameborder="0" 
                                    allow="accelerometer; 
                                    autoplay; 
                                    clipboard-write; 
                                    encrypted-media; 
                                    gyroscope; 
                                    picture-in-picture" 
                                    allowfullscreen></iframe>
                                   : <img src='/images/no-video.jpg' alt='no video available'/> }
                               </div>
                            </div>
                       </div>
                       <div className={style.product__related}
                            ref={containerRef}
                            style={{position:'relative', overflow:'hidden', 
                            height:loading_p ? '25rem': error_p ? '10rem' : 'auto' }}
                           >
                            {loading_p 
                            ? <Loader size='25' center/>
                            : error_p ? <Message type='error' size='3rem' message={error_p}/> 
                            : products && <CardSlider  length={products.length} containerRef={containerRef} title='related products'>
                                {
                                    products.map(product => (
                                        <ProductCard card={product} key={product._id}/>
                                    ))
                                }
                            </CardSlider>}
                       </div></>}
                   </div>
               </div>
            </div>
        </Template>
    )
}

export default Product
