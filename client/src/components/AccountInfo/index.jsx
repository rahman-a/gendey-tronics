import React, {useState} from 'react'
import style from './style.module.scss'
import AccountSideMenu from '../AccountSideMenu'
import {Person, Unlock, MapMarked} from '../icons'
import Info from './info'
import Password from './password'
import Address from './address'

const AccountInfo = ({lang, strings}) => {
    const [infoAction, setAccountInfoAction] = useState('info')
    return (
        <div className={style.accountInfo}>
            <AccountSideMenu>
                <li onClick={() => setAccountInfoAction('info')}>
                    <Person/>
                    {strings.client[lang].basic_info}
                </li>
                <li onClick={() => setAccountInfoAction('pass')}>
                    <Unlock/>
                    {strings.client[lang].change_pass}
                </li>
                <li onClick={() => setAccountInfoAction('address')}>
                    <MapMarked/>
                    {strings.client[lang].update_address}
                </li>
            </AccountSideMenu>
            <div className={style.accountInfo__action}>
                {
                    infoAction === 'info' 
                    ? <Info lang={lang} strings={strings}/>
                    : infoAction === 'pass'
                    ? <Password lang={lang} strings={strings}/> 
                    : infoAction === 'address' && <Address lang={lang} strings={strings}/>
                    
                }
            </div>
        </div>
    )
}

export default AccountInfo
