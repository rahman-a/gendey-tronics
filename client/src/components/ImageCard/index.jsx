import React from 'react'
import style from './style.module.scss'

const ImageCard = ({src,name,showImage, idx}) => {
    
    return (
        <figure className={`${style['imageCard__item_' + (idx+1)]} ${style.imageCard__item}`} 
        title={name ? name : ''}
        onClick={() => showImage(src, idx)}>
            <img src={`images/gallery/${src}`} alt={name ? name : ''} 
            className={style.imageCard__img} />
        </figure>
    )
}

export default ImageCard
