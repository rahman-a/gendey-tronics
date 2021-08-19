import React from 'react'
import style from './style.module.scss'
import CloseSquare from './CloseSquare'

export const Modal = ({children, toggle, closeHandler}) => {

    return (
         
        <div style={{top: toggle ? '50%': '-50%' }} className={style.overlayCard}>
            <span className={style.close}>
                <CloseSquare
                width='20' 
                height='20' 
                className={style.overlayCard__close}
                eventHandler={closeHandler}
                />
            </span>
            {children}
        </div> 
     )
    
    }