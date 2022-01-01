import React, {useRef, useEffect, useState} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import ProductCard from '../../components/ProductCard'
import {useLocation} from 'react-router-dom'
import CardSlider from '../../components/CardSlider'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import product from '../../constants/productConstant'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import strings from '../../localization'

const Products = () => {
    const [showHeroImage, setShowHeroImage] = useState(false)
    const wrapperRef = useRef(null)
    const location = useLocation()
    const dispatch = useDispatch()
    const {loading, error, products} = useSelector(state => state.listProducts)
    const {lang} = useSelector(state => state.language)
    const query = new URLSearchParams(location.search)
    const type = query.get('type')
    const reformType = type => {
        return type.split('-').join(' ')
    }
    useEffect(() => {
        products && setShowHeroImage(true)
        return () => {
            setShowHeroImage(false)
        }
    },[products])
    
    useEffect(() => {
        type && dispatch(actions.products.listProducts(type))
    },[type])
    return (
        <Template>
            <div className={style.products}
            style={{padding:loading? '25rem':'0'}}>
               {showHeroImage && <figure className={style.products__figure}>
                   <div className={`${style.products__figure_content} 
                   ${type === 'air-bag-clear-crash' && style.products__figure_content_down}`}>
                        <h1>{reformType(type)}</h1>
                        <h2>online file services</h2>
                        <p>think more about tested solution</p>
                   </div>
                   <img src={`images/${[type]}_bg.jpg`} alt="products-files" />
               </figure>}
               {loading
               ?<Loader size='25' center custom={{color:'#F8C600'}}>
                   <p>{strings.product[lang].products_load}</p>
               </Loader>        
               :error 
               ?<div style={{textAlign:'center'}}>
                   <img src="/images/no-product.png" alt="no product found"  style={{maxWidth:'35rem'}}/>
                    <Message custom={{margin:'3rem 0'}} type='error' size='5' message={error}/>
               </div> 
               :products && <div className={`container ${style.products__container}`}>
                   <div className={style.products__wrapper} ref={wrapperRef}>
                       <CardSlider
                       length={products.length}
                       containerRef={wrapperRef}>
                            {
                            products.map(product => <ProductCard card={product} key={product._id}/>)
                            }
                       </CardSlider>
                   </div>
               </div>}
            </div>
        </Template>
    )
}

export default Products
