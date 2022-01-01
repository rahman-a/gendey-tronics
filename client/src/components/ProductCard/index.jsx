import React from 'react'
import style from './style.module.scss'
import {Plus} from '../icons'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import strings from '../../localization'

const ProductCard = ({card}) => {
    const history = useHistory()
    const {lang} = useSelector(state => state.language)

    const reformType = type => {
        return type.split(' ').join('-')
    }
    return (
        <div className={style.productCard}>
           <figure>
               <img src={card.image 
                ? `/api/images/${card.image}`
                :'images/no-image.jpg'} alt="product" />
            </figure>
            <div className={style.productCard__option}>
                <p>${card.price}</p>
                <h3>{card.name}</h3>
                <div className={style.productCard__cta}>
                    <button onClick={() => history.push(`/product/${card._id}?type=${reformType(card.type)}`)}>
                        {strings.product[lang].details}
                    </button>
                    <button>{strings.product[lang].cart} <Plus/></button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
