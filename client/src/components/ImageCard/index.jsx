import React from 'react'
import style from './style.module.scss'
import { API_URL } from '../../constants'

const ImageCard = ({ src, showImage, idx }) => {
  return (
    <figure
      className={`${style['imageCard__item_' + (idx + 1)]} ${
        style.imageCard__item
      }`}
      onClick={() => showImage(src, idx)}
    >
      <div className={style.imageCard__image}>
        <img src={`${API_URL}/images/${src}`} alt={`imageCard-${idx}`} />
      </div>
      <span></span>
    </figure>
  )
}

export default ImageCard
