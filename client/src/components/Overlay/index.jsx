import React from 'react'
import style from './style.module.scss'
import { ArrowCircleLeft, ArrowCircleRight } from '../icons'

export const Overlay = ({toggle, arrow, leftArrowHandler, rightArrowHandler, isRightArrow, isLeftArrow}) => {
    
    
    
    return (
        <div style={{display:toggle ? 'block':'none'}} className={style.overlay}>
            {arrow && 
            <>
            {isRightArrow
            &&<span 
            className={`${style.overlay__arrow} ${style.overlay__arrow_right}`}
            onClick={rightArrowHandler}>
                <ArrowCircleRight/>
            </span>}
            {isLeftArrow 
            &&<span 
            className={`${style.overlay__arrow} ${style.overlay__arrow_left}`}
            onClick={leftArrowHandler}>
                <ArrowCircleLeft/>
            </span>}
            </>}
        </div>
    )
}

