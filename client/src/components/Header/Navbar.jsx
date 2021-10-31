import React, {useRef, useState, useEffect} from 'react'
import style from './style.module.scss'
import {Logo, Person, Search, ShoppingCart, ArrowUp, CloseSquare} from '../icons'
import {items} from './links'
import {Link, useHistory} from 'react-router-dom'

const Nav = ({elementRefs}) => {
    const navRef = useRef(null)
    const arrowRef = useRef(null)
    const history = useHistory()
    const [isToggle, setIsToggle] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    window.onscroll = () => {
        if(window.pageYOffset > 65) {
            navRef.current.classList.add(style.header__onScroll)
            arrowRef.current.style.display = 'none'
            if(elementRefs?.curriculum) {
                elementRefs.curriculum.current.style.top =  '10.4rem'
            } 
        }else{
            navRef.current.classList.remove(style.header__onScroll)
            arrowRef.current.style.display = 'none'
            if(elementRefs?.curriculum){
                elementRefs.curriculum.current.style.top =  'unset'
            } 
        }
    }
    useEffect(() => {
        if(navRef && window.pageYOffset > 65) navRef.current.classList.add(style.header__onScroll)
        else  navRef.current.classList.remove(style.header__onScroll)
    })
    return (
        <>
        <div className={style.header__navbar} ref={navRef}>
            <div className='container'>
                <div className={style.header__navBlock}>
                    <div className={style.header__hamMenu}
                    onClick={() => setToggleMenu(true)}>
                        <span></span>
                    </div>
                    <Logo className={style.header__logo} onClick={() => history.push('/')}/>
                    <div className={style.header__links}
                    style={{left:toggleMenu ? '0':'-30rem'}}>
                        <ul className={style.header__list}>
                            {items.map((item,i) =>{
                             return <li key={i} className={style.header__item}
                             onClick={() => setToggleMenu(false)}>
                                <Link 
                                 to={item.link} 
                                 className={style.header__link}>
                                     {item.title.toLocaleUpperCase()}
                                </Link>
                                </li>
                            })}
                        </ul>
                        <button onClick={() => setToggleMenu(false)}>
                            <CloseSquare/>
                        </button>
                    </div>
                    <div className={style.header__actions}>
                        <div className={style.header__signIn}>
                            <span onClick={() => history.push('/signup')}><Person/></span> 
                            <span style={{marginLeft:'.5rem'}} onClick={() => history.push('/login')}>sign in</span>
                        </div>
                        <div className={style.header__search}>
                            <div style={{
                                opacity: isToggle ? '1': '0',
                                visibility:isToggle ? 'visible':'hidden'
                            }} 
                            className={style.header__search_input}>
                                <input type="text" placeholder='search...'/>
                            </div>
                            <span onClick={() => setIsToggle(!isToggle)}>
                                <Search/>
                            </span>
                        </div>
                        <span onClick={() => history.push('/order?process=cart')}>
                            <ShoppingCart/>
                        </span>
                    </div>
                </div>   
            </div>
        </div>
        <div className={style.header__up} ref={arrowRef}>
            <a href='#root'>
                UP<ArrowUp/>
            </a>
        </div>
        </>
    )
}
export default Nav
