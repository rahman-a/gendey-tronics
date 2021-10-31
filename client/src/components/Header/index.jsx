import React,{useState} from 'react'
import DropdownMenu from '../DropdownMenu'
import Navbar from './Navbar'
import style from './style.module.scss'
import {Envelop, PhoneAlt, FbYellow, TwYellow, YtYellow} from '../icons'
import { Link } from 'react-router-dom' 

const Header = ({elementRefs}) => {
    const [lang, setLang] = useState('English')
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.header__block}>
                    <div className={style.header__contact}>
                        <Link to='/contact-us' className={style.header__contact_link}>have any question?</Link>
                        <a href="mailto:mohamedgendy@gmail.com" className={style.header__contact_link}>
                            <Envelop className={`${style.header__icon} ${style.header__contact_link_envelop}`}/> mohamedgendy@gmail.com
                        </a>
                        <a href="tel:012345678901" className={style.header__contact_link}>
                            <PhoneAlt  className={`${style.header__icon} ${style.header__contact_link_phone}`}/> 012345678901
                        </a>
                    </div>
                    <div className={style.header__options}>
                        <div className={style.header__social}>
                            <FbYellow className={style.header__social_icon}/>
                            <TwYellow className={style.header__social_icon}/>
                            <YtYellow className={style.header__social_icon}/>
                        </div>
                        <div className={style.header__lang}>
                            <DropdownMenu value={lang}>
                                <li onClick={({target:{innerText}}) => setLang(innerText) }>English</li>
                                <li onClick={({target:{innerText}}) => setLang(innerText) }>Arabic</li>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar elementRefs={elementRefs}/>
        </header>
    )
}

export default Header
