import React from 'react'
import style from './style.module.scss'
import {Logo, FbBlack, TwBlack, IgBlack, WtsBlack, Assistant} from '../icons'
import lists from './links'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import strings from '../../localization'

const Footer = () => {
    const history = useHistory()
    const {lang} = useSelector(state => state.language)
    return (
        <div className={`${style.footer} footer`}>
            <div className='container'>
                <div className={style.footer__block}>
                    <div className={style.footer__logo}>
                     <Logo/>
                     <button className={style.footer__contact} 
                     onClick={() => history.push('/contact-us')}>
                         <span className={style.footer__contact_logo}>
                            <Assistant/>
                         </span>
                         <span className={style.footer__contact_title}
                         style={{transform:lang ==='ar' ? 'translateX(6rem)' :'translateX(-3rem)'}}>
                             {strings.footer[lang].help}
                         </span>
                     </button>
                    </div>
                    <div className={`${style.footer__line} ${lang === 'ar' ? style.footer__line_ar:''}`}></div>
                    <div className={style.footer__details}>
                    
                        {lists.map((list, i) => {
                            return <ul key={i}>
                                {list.map((item, idx) => {
                                    return <li key={idx}>
                                    <Link to={item.link} className={style.footer__link}>
                                        {strings.footer[lang][item.title]}
                                    </Link>
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
                <p>Developed By: <a href="https://abdrahman.me">Ahmed Abdelrahman</a></p>
            </div>
        </div>
    )
}

export default Footer
