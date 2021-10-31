import React from 'react'
import style from './style.module.scss'
import {CartPlus, HeartOutline} from '../icons'

const Fav = () => {
    return (
        <div className={style.favList__fav}>
            <div className={style.favList__product}>
                <HeartOutline/>
                <img src="images/product-1.png" alt="item" />
                <a href="/product">The perfect classic</a>
            </div>
            <p className={style.favList__price}>99<sup>$</sup></p>
            <CartPlus className={style.favList__fav_icon}/>
            <button className={style.favList__fav_action}>X</button>
        </div>
    )
}

export default Fav
