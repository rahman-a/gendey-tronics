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
         <button>079 555 5555</button>
         <button>+962 5872147</button>
     </div>
    )
}

export default Call
