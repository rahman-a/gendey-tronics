import React, {useRef, useState} from 'react'
import style from './style.module.scss'
import {Play} from '../icons'

const CardSlider = ({children, length, containerRef, title}) => {
    const [leftOffset, setLeftOffset] = useState(0)
    const [slideTrack, setSlideTrack] = useState(0)
    const slideRef = useRef(null)

    const slideCardsHandler = direction => {
        const containerWidth = containerRef.current.getBoundingClientRect().width
        const cardsShownInContainerWidth = containerWidth / 370
        if(direction === 'prev') {
            if(slideTrack <= (-length + cardsShownInContainerWidth) ) {
                slideRef.current.style.left = 0
                setSlideTrack(0)
                setLeftOffset(0)                
                return
            } 
            slideRef.current.style.left = `${leftOffset - 370}px`
            setSlideTrack(slideTrack - 1)
            setLeftOffset(leftOffset - 370)
        }else if (direction === 'next') {
            if(slideTrack >= 0) return
            slideRef.current.style.left = `${leftOffset + 370}px`
            setSlideTrack(slideTrack + 1)
            setLeftOffset(leftOffset + 370)
        }

    }
    return (
        <div className={style.slider}>
            <div className={style.slider__control}>
                <div className={style.slider__title}>
                   {title && <h3>{title.toUpperCase()}</h3>}
                </div>
                <div className={style.slider__control_btn}>
                    <button onClick={() => slideCardsHandler('prev')}>
                        <Play/>
                    </button>
                    <button onClick={() => slideCardsHandler('next')}>
                        <Play/>
                    </button>
                </div>
            </div>
            <div ref={slideRef} className={style.slider__container}>
                {children}
            </div>
        </div>
    )
}

export default CardSlider
