import React from 'react'
import style from './style.module.scss'
import {Logo, FbBlack, TwBlack, IgBlack, WtsBlack, Assistant} from '../icons'
import lists from './links'
import {Link, useHistory} from 'react-router-dom'

const Footer = () => {
    const history = useHistory()
    // eslint-disable-next-line no-script-url
    const url = 'javascript:void(0)'
    return (
        <div className={style.footer}>
            <div className='container'>
                <div className={style.footer__block}>
                    <div className={style.footer__logo}>
                     <Logo/>
                     <button className={style.footer__contact} 
                     onClick={() => history.push('/contact-us')}>
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
                                    <Link to={item.link} className={style.footer__link}>{item.title}</Link>
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
