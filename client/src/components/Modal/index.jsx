import React from 'react'
import style from './style.module.scss'
import CloseSquare from './CloseSquare'


export const Modal = ({children, toggle, closeHandler, styling}) => {
    const getStyle = {
        top: toggle ? '55%': '-100%',
        ...styling
    }

    return (
         
        <div style={getStyle} className={style.modal}>
            <span className={style.close}>
                <CloseSquare
                width='20' 
                height='20' 
                className={style.modal__close}
                onClick={closeHandler}
                />
            </span>
            {children}
        </div> 
     )
    
    }