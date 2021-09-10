import React from 'react'
import style from './style.module.scss'
import {MapMarked} from '../icons'

const Address = () => {
    return (
        <div className={style.accountInfo__address}>
            <div className={style.accountInfo__address_new}>
                <div className={style.accountInfo__address_cta}>
                    <p>There is no location</p>
                    <p>Add your location now</p>
                    <button>Add location</button>
                </div>
                <div className={style.accountInfo__address_icon}>
                    <MapMarked/>
                </div>
            </div>
            {/* <div className={style.accountInfo__address_location}></div>
            <div className={style.accountInfo__address_map}></div> */}
        </div>
    )
}

export default Address