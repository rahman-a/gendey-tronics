import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import ProductCard from '../../components/ProductCard'
import {products} from '../../data'
import {useLocation} from 'react-router-dom'

const Products = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const type = query.get('type')

    return (
        <Template>
            <div className={style.products}>
               <figure className={style.products__figure}>
                   <div className={`${style.products__figure_content} 
                   ${products.[type].position === 'down' && style.products__figure_content_down}`}>
                    <h1>{products.[type].header}</h1>
                    <h2>online file services</h2>
                    <p>think more about tested solution</p>
                   </div>
                   <img src={`images/${[type]}_bg.jpg`} alt="immo files" />
               </figure>
               <div className="container">
                   <div className={style.products__wrapper}>
                        {products.[type].cards.map(crd => <ProductCard card={crd} key={crd._id}/>)}
                   </div>
               </div>
            </div>
        </Template>
    )
}

export default Products
