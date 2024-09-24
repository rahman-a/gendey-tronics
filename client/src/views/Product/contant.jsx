import React, { useEffect } from 'react'
import style from './style.module.scss'
import { PhoneRing, Zoom, Whats, Check } from '../../components/icons'
import strings from '../../localization'

const Contact = ({ setContactType, setCallMethod, callMethod, lang }) => {
  return (
    <div className={style.product__contact}>
      <h2>{strings.product[lang].contact_method}</h2>
      <div className={style.product__contact_options}>
        <div
          className={style.product__contact_item}
          onClick={() => setCallMethod('phone')}
        >
          <div
            className={style.product__contact_item_check}
            style={{ display: callMethod === 'phone' ? 'flex' : 'none' }}
          >
            <Check />
          </div>
          <PhoneRing />
          <p>{strings.product[lang].phone}</p>
        </div>
        <div
          className={style.product__contact_item}
          onClick={() => setCallMethod('zoom')}
        >
          <div
            className={style.product__contact_item_check}
            style={{ display: callMethod === 'zoom' ? 'flex' : 'none' }}
          >
            <Check />
          </div>
          <Zoom />
          <p>{strings.product[lang].zoom}</p>
        </div>
        <div
          className={style.product__contact_item}
          onClick={() => setCallMethod('whats')}
        >
          <div
            className={style.product__contact_item_check}
            style={{ display: callMethod === 'whats' ? 'flex' : 'none' }}
          >
            <Check />
          </div>
          <Whats />
          <p>{strings.product[lang].whats}</p>
        </div>
      </div>
      <button onClick={() => setContactType('phone')}>
        {lang === 'en' ? 'submit' : 'تم'}
      </button>
    </div>
  )
}

export default Contact
