import React, {useRef, useState, useEffect} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CardSlider from '../../components/CardSlider'
import ProductCard from '../../components/ProductCard'
import {products} from '../../data'
import {PhoneAlt, ShoppingCart, Wishlist, Schedule} from '../../components/icons'
import {Modal} from '../../components/Modal'
import Options from './options'
import Contact from './contant'
import Call from './call'
import PhoneNumber from './phoneNumber'
import Calender from '../../components/Calender'

const options = [
    {
        _id:1,
        question:'lorem ipsum dolar set amet 1',
        options:[
            'stick',
            'meduim',
            'show',
        ]
    },
    {
        _id:2,
        question:'lorem ipsum dolar set amet 2',
        options:[
            'saw',
            'habibi',
            'jangek',
        ]
    },
    {
        _id:3,
        question:'lorem ipsum dolar set amet 3',
        options:[
            'sapeti',
            'wongati',
        ]
    },
    {
        _id:4,
        question:'lorem ipsum dolar set amet 4',
        options:[
            'dertuy',
            'sagin',
            'fortan',
            'gortan',
            'eryuan',
        ]
    },
    

]

const Product = () => {
    const [qty, setQty] = useState(1)
    const [toggle, setToggle] = useState(false)
    const containerRef = useRef(null)
    const [actionType, setActionType] = useState('')
    const [contactType, setContactType] = useState('calender')
    const defineQty = action => {
        if(action === 'increment') {
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
    useEffect(() => {
        if(contactType === 'done'){
            setTimeout(() => {
                setToggle(false)
            }, 2000);
        }
    }, [contactType])
    return (
        <Template>
            <Modal toggle={toggle} 
            closeHandler={() => setToggle(false)}
            styling={{boxShadow:'-1px 1px 11px 0px rgb(0 0 0 / 50%)'}}>
                {actionType === 'option'
                ?<Options options={options}/>
                : actionType === 'call' 
                ?<Call/>
                : actionType === 'contact' 
                &&
                <>
                {contactType === 'option'
                ?<Contact setContactType={setContactType}/>
                : contactType === 'phone' 
                ?<PhoneNumber setContactType={setContactType}/>
                : contactType === 'calender'
                ?<Calender setContactType={setContactType}/>
                : contactType === 'done' 
                &&<div className={style.product__done}>
                    <span>DONE</span>
                </div>}
                </>}
            </Modal>
            <div className={style.product}>
            <div className={style.product__overlay}
            style={{transform:toggle ? 'scale(1)': 'scale(0)'}}></div>
               <div className="container">
                   <div className={style.product__wrapper}>
                       <div className={style.product__content}>
                            <div className={style.product__details}>
                                <figure>
                                    <img src="images/immo/immo-1.png" alt="immo off" />
                                </figure>
                                <div className={style.product__desc}>
                                    <h2>Product Description</h2>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                        Sit saepe perferendis suscipit aliquid harum et ipsa illum iste delectus 
                                        laborum nam illo labore, obcaecati molestiae inventore quos deleniti 
                                    </p>
                                </div>
                            </div>
                            <div className={style.product__action}>
                                <div className={style.product__title}>
                                    <h1>immo off</h1>
                                    <span>كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259</span>
                                </div>
                                <div className={style.product__info}>
                                    <div className={style.product__qty}>
                                        <p>Quantity</p>
                                        <div className={style.product__qty_action}>
                                            <button onClick={() => defineQty('decrement')}>-</button>
                                            <span>{qty}</span>
                                            <button onClick={() => defineQty('increment')}>+</button>
                                        </div>
                                    </div>
                                    <div className={style.product__price}>
                                        <p>Price</p>
                                        <p>45<sup>$</sup></p>
                                    </div>
                               </div>
                               <div className={style.product__cta}>
                                   <div className={style.product__cta_add}>
                                       <button className={style.product__cta_gray}
                                       onClick={() => setActionTypeHandler('option')}> 
                                            <ShoppingCart/> Add to Cart
                                       </button>
                                       <button className={style.product__cta_yellow}> 
                                            <Wishlist/> Add to wishlist
                                       </button>
                                   </div>
                                   <div className={style.product__cta_call}>
                                       <button className={style.product__cta_gray}
                                       onClick={() => setActionTypeHandler('call')}>
                                           <PhoneAlt/> Call us
                                        </button>
                                       <button className={style.product__cta_yellow}
                                       onClick={() => setActionTypeHandler('contact')}>
                                           <Schedule/> book call
                                        </button>
                                   </div>
                               </div>
                               <div className={style.product__video}>
                                    <iframe 
                                    width="560" 
                                    height="315" 
                                    src="https://www.youtube.com/embed/TYSD5VMoEjY" 
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; 
                                    autoplay; 
                                    clipboard-write; 
                                    encrypted-media; 
                                    gyroscope; 
                                    picture-in-picture" 
                                    allowfullscreen></iframe>
                               </div>
                            </div>
                       </div>
                       <div className={style.product__related}
                            ref={containerRef}
                            style={{position:'relative', overflow:'hidden'}}
                           >
                            <CardSlider  length={products.immo.cards.length} containerRef={containerRef} title='related products'>
                                {
                                    products.immo.cards.map(card => (
                                        <ProductCard card={card} key={card._id}/>
                                    ))
                                }
                            </CardSlider>
                       </div>
                   </div>
               </div>
            </div>
        </Template>
    )
}

export default Product
