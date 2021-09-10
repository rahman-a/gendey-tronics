import React, {useState} from 'react'
import style from './style.module.scss'
import AccountSideMenu from '../AccountSideMenu'
import {Person, Unlock, MapMarked} from '../icons'
import Info from './info'
import Password from './password'
import Address from './address'

const AccountInfo = () => {
    const [infoAction, setAccountInfoAction] = useState('info')
    return (
        <div className={style.accountInfo}>
            <AccountSideMenu>
                <li onClick={() => setAccountInfoAction('info')}>
                    <Person/>
                    BASIC INFORMATION
                </li>
                <li onClick={() => setAccountInfoAction('pass')}>
                    <Unlock/>
                    CHANGE YOUR PASSWORD
                </li>
                <li onClick={() => setAccountInfoAction('address')}>
                    <MapMarked/>
                    MODIFY YOUR ADDRESS BOOK ENTIRES
                </li>
            </AccountSideMenu>
            <div className={style.accountInfo__action}>
                {
                    infoAction === 'info' 
                    ? <Info/>
                    : infoAction === 'pass'
                    ? <Password/> 
                    : infoAction === 'address' && <Address/>
                    
                }
            </div>
        </div>
    )
}

export default AccountInfo
