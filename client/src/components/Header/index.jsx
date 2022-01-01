import React, {useState} from 'react'
import DropdownMenu from '../DropdownMenu'
import Navbar from './Navbar'
import style from './style.module.scss'
import strings from '../../localization'
import {Envelop, PhoneAlt, FbYellow, TwYellow, YtYellow} from '../icons'
import { Link } from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'

const Header = ({elementRefs}) => {
    const [loadingState, setLoadingState] = useState(false)
    const {lang} = useSelector(state => state.language)
    const dispatch = useDispatch()
    
    const setLanguageHandler = lang => {
        setLoadingState(true)
        if(lang === 'English') {
            setTimeout(() => {
                dispatch({type:'CHANGE_LANGUAGE', payload:'en'})
                setLoadingState(false)
            },1000)
            return
        }
        if(lang === 'العربية') {
            setTimeout(() => {
                dispatch({type:'CHANGE_LANGUAGE', payload:'ar'})
                setLoadingState(false)
            },1000)
            return
        }
    }
    return (
        <header className={`${style.header} header`}>
            <div className="container">
                <div className={style.header__block}>
                    <div className={style.header__contact} style={{display:lang === 'ar' ? 'flex' : 'block'}}>
                        <Link to='/contact-us' 
                        className={`${style.header__contact_link} ${lang === 'ar' ? style.header__contact_link_ar :''}`}>
                            {strings.header[lang].question}
                        </Link>
                        <a href="mailto:mohamedgendy@gmail.com" 
                        className={`${style.header__contact_link} ${lang === 'ar' ? style.header__contact_link_ar :''}`}>
                            <Envelop className={`${style.header__icon} ${style.header__contact_link_envelop}`}/> mohamedgendy@gmail.com
                        </a>
                        <a href="tel:012345678901" 
                        className={`${style.header__contact_link} ${lang === 'ar' ? style.header__contact_link_ar :''}`}>
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
                            <DropdownMenu
                            loading={loadingState}
                            value={lang === 'ar' ?'English' :'العربية'}>
                                <li onClick={({target:{innerText}}) => setLanguageHandler(innerText) }>English</li>
                                <li onClick={({target:{innerText}}) => setLanguageHandler(innerText) }>العربية</li>
                            </DropdownMenu>
                            {loadingState && <Loader size='4' center custom={{opacity:'0.7'}}/>}
                        </div>
                    </div>
                </div>
            </div>
            <Navbar elementRefs={elementRefs}/>
        </header>
    )
}

export default Header
