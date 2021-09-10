import React from 'react'
import style from './style.module.scss'

const AccountSideMenu = ({children}) => {
    return (
        <div className={style.sideMenu}>
            <ul className={style.sideMenu__list}>
                {children}
            </ul>
        </div>
    )
}

export default AccountSideMenu
