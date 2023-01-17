import React from 'react'
import style from './style.module.scss'
import {PhoneAlt} from '../../components/icons'

const Call = () => {
    return (
        <div className={style.product__call}>
        <div>
            <button>
                 <PhoneAlt/>
             </button>
         </div>
         <a href="tel:01064345626">01064345626</a>
         <a href="tel:01127138988">01127138988</a>
     </div>
    )
}

export default Call
