import React, {useState} from 'react'
import style from './style.module.scss'
import {PhoneRing, Zoom, Whats, Check} from '../../components/icons'

const Contact = ({setContactType}) => {
    const [contactOption, setContactOption] = useState('')
    return (
        <div className={style.product__contact}>
            <h2>choose your contact method ?</h2>
            <div className={style.product__contact_options}>
                <div className={style.product__contact_item}
                onClick={() => setContactOption('phone')}>
                    <div className={style.product__contact_item_check}
                    style={{display: contactOption === 'phone' ?'flex' : 'none'}}>
                        <Check/>
                    </div>
                    <PhoneRing/>
                    <p>phone call</p>
                </div>
                <div className={style.product__contact_item}
                onClick={() => setContactOption('zoom')}>
                    <div className={style.product__contact_item_check}
                    style={{display: contactOption === 'zoom' ?'flex' : 'none'}}>
                        <Check/>
                    </div>
                    <Zoom/>
                    <p>zoom meeting</p>
                </div>
                <div className={style.product__contact_item} 
                onClick={() => setContactOption('whats')}>
                    <div className={style.product__contact_item_check}
                    style={{display: contactOption === 'whats' ?'flex' : 'none'}}>
                        <Check/>
                    </div>
                    <Whats/>
                    <p>WhatsApp Chat</p>
                </div>
            </div>
            <button onClick={() => setContactType('phone')}>submit</button>
        </div>
    )
}

export default Contact
