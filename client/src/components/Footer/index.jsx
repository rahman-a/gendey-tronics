import React from 'react'
import style from './style.module.scss'
import {Logo, FbBlack, TwBlack, IgBlack, WtsBlack, Assistant} from '../icons'

const Footer = () => {
    const lists = [
       ['Explore','immo off','hardware tools','tunning','courses','The Blog','ECU PROGRAMMERS'],
       ['Account','Manage Account','My Favorites','My Cart'],
       ['Support','FAQs','Privacy Policy','Refund Policy','Cookies'],
       ['Company','Press','About us','Our Story','Video Gallery','Photo Gallery']
    ]
   
    // eslint-disable-next-line no-script-url
    const url = 'javascript:void(0)'
    return (
        <div className={style.footer}>
            <div className='container'>
                <div className={style.footer__block}>
                    <div className={style.footer__logo}>
                     <Logo/>
                     <button className={style.footer__contact}>
                         <span className={style.footer__contact_logo}>
                            <Assistant/>
                         </span>
                         <span className={style.footer__contact_title}>Help</span>
                     </button>
                    </div>
                    <div className={style.footer__line}></div>
                    <div className={style.footer__details}>
                    
                        {lists.map((list, i) => {
                            return <ul key={i}>
                                {list.map((item, idx) => {
                                    return <li key={idx}>
                                    <a href={url} className={style.footer__link}>{item}</a>
                                </li>
                                })}
                            </ul>
                        })}
                      
                    </div>
                </div>
                <div className={style.footer__social}>
                    <WtsBlack/>
                    <IgBlack/>
                    <FbBlack/>
                    <TwBlack/>
                </div>
            </div>
            <div className={style.footer__copyright}>
                <p>{'gendytronics'.toLocaleUpperCase()} &copy; {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Footer
