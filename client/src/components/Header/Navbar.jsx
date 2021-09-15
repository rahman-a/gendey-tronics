import React, {useRef, useState} from 'react'
import style from './style.module.scss'
import {Logo, Person, Search, ShoppingCart, ArrowUp} from '../icons'
import {items} from './links'
import {Link, useHistory} from 'react-router-dom'

const Nav = () => {
    const searchRef = useRef(null)
    const navRef = useRef(null)
    const arrowRef = useRef(null)
    const history = useHistory()
    const [isToggle, setIsToggle] = useState(false)
    const toggleSearchBar = _ => {
        if(!isToggle){
            searchRef.current.style.opacity = '1'
            setIsToggle(true)
        }else {
            searchRef.current.style.opacity = 0
            setIsToggle(false)
        }
    }
    window.onscroll = () => {
        if(window.pageYOffset > 65) {
            navRef.current.classList.add(style.header__onScroll)
            arrowRef.current.style.display = 'block'
        }else{
            navRef.current.classList.remove(style.header__onScroll)
            arrowRef.current.style.display = 'none'
        }
    }
    return (
        <>
        <div className={style.header__navbar} ref={navRef}>
            <div className='container'>
                <div className={style.header__navBlock}>
                    <Logo className={style.header__logo}/>
                    <div className={style.header__links}>
                        <ul className={style.header__list}>
                            {items.map((item,i) =>{
                             return <li key={i} className={style.header__item}>
                                <Link 
                                 to={item.link} 
                                 className={style.header__link}>
                                     {item.title.toLocaleUpperCase()}
                                </Link>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className={style.header__actions}>
                        <div className={style.header__signIn} onClick={() => history.push('/login')}>
                            <Person/>
                            <span style={{marginLeft:'.5rem'}}>sign in</span>
                        </div>
                        <div className={style.header__search}>
                            <input type="text" placeholder='search...' ref={searchRef}/>
                            <span onClick={toggleSearchBar}>
                                <Search/>
                            </span>
                        </div>
                        <ShoppingCart/>
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
