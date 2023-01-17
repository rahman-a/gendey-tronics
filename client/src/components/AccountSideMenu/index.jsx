import React from 'react'
import style from './style.module.scss'
import { useSelector } from 'react-redux'

const AccountSideMenu = ({children}) => {
    const {lang} = useSelector(state => state.language)

    return (
        <div className={style.sideMenu}>
            <ul className={`${style.sideMenu__list}  
            ${lang === 'ar' ? style.sideMenu__list_ar :''}`}>
                {children}
            </ul>
        </div>
    )
}

export default AccountSideMenu
