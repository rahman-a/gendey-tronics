import React from 'react'
import style from './style.module.scss'
import strings from '../../localization'

const PhoneNumber = ({setContactType, setCallPhone, callPhone, BookCallHandler, lang}) => {
    return (
        <div className={style.product__phoneNumber}>
            <h2>{strings.product[lang].phone_number}</h2>
            <input 
            type="text"
             placeholder='00000000000000'
             value={callPhone}
             onChange={(e) => setCallPhone(e.target.value)}/>
            <button
            onClick={BookCallHandler}>{
                lang === 'en' ? 'submit': 'تم'
            }</button>
        </div>
    )
}

export default PhoneNumber
