import React, {useEffect, useState} from 'react'
import DropdownMenu from '../DropdownMenu'
import Navbar from './Navbar'
import style from './style.module.scss'
import strings from '../../localization'
import {Envelop, PhoneAlt, FbYellow, TwYellow, YtYellow, CloseSquare} from '../icons'
import { Link } from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'

let setBetaMessage = true

const Header = ({elementRefs}) => {
    const [isNotify, setIsNotify] = useState(false)
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

    useEffect(() => {
        if(setBetaMessage) {
            setTimeout(() => {
                setIsNotify(true)
            },1500)
            setBetaMessage = false
        }
    } , [])
        
    return (
        <>
            <div className='beta-message' style={{top:isNotify ? '1rem' : '-50rem'}}>
                <span onClick={() => setIsNotify(false)}> <CloseSquare/> </span>
                
                {
                    lang === 'ar' 
                    ? <>
                        <p> الموقع فى طور الأختبار حتى يتم اضافة المحتوى من دورات تدريبية ومنتجات ومقالات </p>
                        <p> أيضا أنظمة الدفع فى الموقع تحت الاختبار </p>
                    </>
                    : <>
                        <p> The Website in Test Mode until all assets (products, courses, blogs) added </p>
                        <p> Also The Payment Process in Test mode </p>
                    </> 
                }
                
                
            </div>
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
                            <a href="tel:01064345626" 
                            className={`${style.header__contact_link} ${lang === 'ar' ? style.header__contact_link_ar :''}`}>
                                <PhoneAlt  className={`${style.header__icon} ${style.header__contact_link_phone}`}/> 01064345626
                            </a>
                        </div>
                        <div className={style.header__options}>
                            <div className={style.header__social}>
                               <a className={style.header__social_icon} href="https://www.facebook.com/aljazriacademy/" target='_blank' rel="noreferrer"><FbYellow/></a> 
                               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                               <a className={style.header__social_icon}><TwYellow/></a> 
                               <a className={style.header__social_icon} href="https://www.youtube.com/channel/UCCn3k-RNMMRYl5Rl07kCH2A" target='_blank' rel="noreferrer"><YtYellow/></a> 
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
        </>
    )
}

export default Header
