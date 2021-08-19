import React,{useState} from 'react'
import DropdownMenu from '../DropdownMenu'
import Navbar from './Navbar'
import style from './style.module.scss'
import {Envelop, PhoneAlt, FbYellow, TwYellow, YtYellow} from '../icons'

const Header = () => {
    const [lang, setLang] = useState('English')
    // eslint-disable-next-line no-script-url
    let url ='javascript:void(0)';
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.header__block}>
                    <div className={style.header__contact}>
                        <a href={url} className={style.header__contact_link}>have any question?</a>
                        <a href="mailto:mohamedgrndy@gmail.com" className={style.header__contact_link}>
                            <Envelop className={style.header__icon}/> mohamedgrndy@gmail.com
                        </a>
                        <a href="tel:012345678901" className={style.header__contact_link}>
                            <PhoneAlt  className={style.header__icon}/> 012345678901
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
            <Navbar/>
        </header>
    )
}

export default Header
