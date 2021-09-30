import React from 'react'
import style from './style.module.scss'

const PhoneNumber = ({setContactType}) => {
    return (
        <div className={style.product__phoneNumber}>
            <h2>enter your phone number</h2>
            <input type="text" placeholder='00000000000000'/>
            <button
            onClick={() => setContactType('done')}>submit</button>
        </div>
    )
}

export default PhoneNumber
