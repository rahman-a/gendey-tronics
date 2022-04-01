import React, { useRef, useState, useEffect } from 'react'
import style from './style.module.scss'
import {
  Person,
  Search,
  ShoppingCart,
  ArrowUp,
  CloseSquare,
  Logout,
  Whats
} from '../icons'
import { items } from './links'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../Loader'
import SearchOutput from '../SearchOutput'
import strings from '../../localization'
import gendy_logo from '../../img/gendy_logo.png'

const Nav = ({ elementRefs }) => {
  const navRef = useRef(null)
  const arrowRef = useRef(null)
  const history = useHistory()
  const [isToggle, setIsToggle] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.client)
  const { loading, success } = useSelector((state) => state.logout)
  const {items:cartItems} = useSelector(state => state.cartItems)
  const {lang} = useSelector(state => state.language)

  const logoutHandler = () => {
    dispatch(actions.client.logout())
  }

  const styleSearchInput = () => {
    const style = {
      opacity: isToggle ? '1' : '0',
      visibility: isToggle ? 'visible' : 'hidden',
      left:lang === 'ar' ?'unset':'-19rem',
      right:lang === 'ar' ? '-18.3rem' :'unset'
    }
    if(window.matchMedia("(max-width: 61.99em)").matches) {
      style.right = lang === 'ar' ? '0' : 'unset'
      style.left = lang === 'ar' ?'unset':'0'
    }

    return style
  }

  const inputSearchHandler = (e) => {
    if(e.keyCode === 13 || e.which === 13) {
        if(searchValue) {
          setIsSearch(true)
        }
    }
  }

  window.onscroll = () => {
    if (window.pageYOffset > 65) {
      navRef.current?.classList.add(style.header__onScroll)
      if(window.matchMedia("(min-width:61.99em)").matches){
        arrowRef.current.style.display = 'block'
      }
      if (elementRefs?.curriculum?.current) {
        elementRefs.curriculum.current.style.top = '10.4rem'
      }
    } else {
      navRef.current?.classList.remove(style.header__onScroll)
      arrowRef.current.style.display = 'none'
      if (elementRefs?.curriculum?.current) {
        elementRefs.curriculum.current.style.top = 'unset'
      }
    }
  }
  useEffect(() => {
    if (navRef && window.pageYOffset > 65)
      navRef.current.classList.add(style.header__onScroll)
    else navRef.current.classList.remove(style.header__onScroll)
    if(success){
        history.push('/')
        dispatch({type: constants.client.LOGOUT_RESET})
        dispatch({type:constants.product.LIST_CART_ITEMS_RESET})
    } 
    !cartItems && dispatch(actions.products.listItems())
  }, [success, history, dispatch, cartItems])
  return (
    <>
      
      <SearchOutput
      isSearch={isSearch}
      setIsSearch={setIsSearch}
      keyword={searchValue}
      />
      
      <div className={style.header__navbar} ref={navRef}>
        <div className='container'>
          <div className={style.header__navBlock}>
            <div
              className={style.header__hamMenu}
              onClick={() => setToggleMenu(true)}
            >
              <span></span>
            </div>
            <div className={style.header__logo} onClick={() => history.push('/')}>
              <img src={gendy_logo} alt='logo' />
            </div>
            <div
              className={`${style.header__links} ${lang === 'ar' ? style.header__links_ar : ''}`}
              style={{ 
                left: toggleMenu&&lang==='en' 
                ? '0' 
                :lang ==='en' ? '-30rem' :'unset' ,
                right:toggleMenu&&lang==='ar' 
                ? '0' 
                :lang ==='ar' ? '-30rem' :'unset' ,
              }}
            >
              <ul className={style.header__list}>
                {items.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={style.header__item}
                      onClick={() => setToggleMenu(false)}
                    >
                      <Link to={item.link} className={style.header__link}>
                        {strings.header[lang][item.title].toLocaleUpperCase()}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <button onClick={() => setToggleMenu(false)}>
                <CloseSquare />
              </button>
            </div>
            <div className={style.header__actions}>
              <div className={`${style.header__signIn} ${lang === 'ar' ? style.header__signIn_ar :''}`}>
                {isAuth ? (
                  <>
                    <span
                      onClick={() => history.push('/account#info')}
                      style={{ marginLeft:'1rem'}}
                      title='Profile'
                    >
                      <Person />
                    </span>
                    {loading ? <Loader size='4'/>
                    :<span
                    style={{ 
                      marginLeft: lang === 'en' ? '1rem' : 'unset',
                      marginRight: lang === 'ar'? '1rem' : 'unset'
                    }}
                      onClick={logoutHandler}
                      title='Logout'
                    >
                      <Logout />
                    </span>}
                  </>
                ) : (
                  <>
                    <span onClick={() => history.push('/signup')}>
                      <Person />
                    </span>
                    <span
                      style={{ margin: lang === 'ar' ? '0 2rem 0 0' : '0 0 0 0.5rem'}}
                      onClick={() => history.push('/login')}
                    >
                      {strings.header[lang].log}
                    </span>
                  </>
                )}
              </div>
              <div className={style.header__search}>
                <div
                  style={styleSearchInput()}
                  className={style.header__search_input}
                >
                  <input type='text'
                  onKeyDown={inputSearchHandler}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={lang === 'en' ?' Search....' : 'بحث....'}/>
                </div>
                <span onClick={() => setIsToggle(!isToggle)}>
                  <Search />
                </span>
              </div>
              <span onClick={() => history.push('/order?process=cart')}
              style={{position:'relative', marginRight:lang === 'ar' ?'1rem': '0'}}>
                <span className={style.header__cart}>{
                  cartItems && cartItems.length
                }</span>
                <ShoppingCart />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.header__up} ref={arrowRef}>
        <a href='#root'>
          {lang === 'en' ?'UP' :'أعلى'}
          <ArrowUp />
        </a>
      </div>
      <div className={style.header__whats}>
        <a 
        href={`https://api.whatsapp.com/send?phone=+201064345626 &text=السلام عليكم`} 
        target='_blank'
        rel='noreferrer'>
          <Whats />
        </a>
      </div>
    </>
  )
}
export default Nav
