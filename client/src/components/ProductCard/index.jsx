import React from 'react'
import style from './style.module.scss'
import {Plus} from '../icons'

const ProductCard = ({card}) => {
    return (
        <div className={style.productCard}>
           <figure>
               <img src={card.image} alt="product" />
            </figure>
            <div className={style.productCard__option}>
                <p>${card.price}</p>
                <h3>{card.name}</h3>
                <div className={style.productCard__cta}>
                    <button>Details</button>
                    <button>Add to Cart <Plus/></button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
