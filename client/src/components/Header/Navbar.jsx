import React, { useRef, useState, useEffect } from 'react'
import style from './style.module.scss'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Placeholder } from 'react-bootstrap'
import {
  Person,
  Search,
  ShoppingCart,
  ArrowUp,
  CloseSquare,
  AdminCounter,
  Logout,
  Whats,
} from '../icons'
import { items } from './links'
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
  const [dashboardPosition, setDashBoardPosition] = useState(0)
  const dispatch = useDispatch()
  const { isAuth, info } = useSelector((state) => state.client)
  const { loading, success } = useSelector((state) => state.logout)
  const { items: cartItems } = useSelector((state) => state.cartItems)
  const { items: navItems, isLoading } = useSelector(
    (state) => state.listNavItems
  )
  const { lang } = useSelector((state) => state.language)

  const logoutHandler = () => {
    dispatch(actions.client.logout())
  }

  const styleSearchInput = () => {
    const style = {
      opacity: isToggle ? '1' : '0',
      visibility: isToggle ? 'visible' : 'hidden',
      left: lang === 'ar' ? 'unset' : '-19rem',
      right: lang === 'ar' ? '-18.3rem' : 'unset',
    }
    if (window.matchMedia('(max-width: 61.99em)').matches) {
      style.right = lang === 'ar' ? '0' : 'unset'
      style.left = lang === 'ar' ? 'unset' : '0'
    }

    return style
  }

  const inputSearchHandler = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (searchValue) {
        setIsSearch(true)
      }
    }
  }

  const dashboardPositionHandler = (_) => {
    dashboardPosition === 0
      ? setDashBoardPosition(-45)
      : setDashBoardPosition(0)
  }

  const toggleMenuHandler = (e) => {
    const currentElement = e.target.parentNode
    currentElement.classList.toggle(style.header__item_active)
    const siblings = [...e.target.parentNode.parentNode.children]
    siblings.forEach((sibling) => {
      currentElement !== sibling &&
        sibling.classList.remove(style.header__item_active)
    })

    if (!currentElement.classList.contains(style.header__item_active)) {
      setToggleMenu(false)
    }
  }

  window.onscroll = () => {
    if (window.pageYOffset > 65) {
      navRef.current?.classList.add(style.header__onScroll)
      if (window.matchMedia('(min-width:61.99em)').matches) {
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

  const insertHyphens = (str) => {
    return str.replace(/ /g, '-').trim().toLowerCase()
  }

  const navigateTo = (str) => {
    const title = str.toLowerCase()
    title === 'home'
      ? history.push('/')
      : history.push(`/${insertHyphens(title)}`)
  }

  useEffect(() => {
    !navItems && dispatch(actions.content.listNavItems())
  }, [])

  useEffect(() => {
    if (navRef && window.pageYOffset > 65)
      navRef.current.classList.add(style.header__onScroll)
    else navRef.current.classList.remove(style.header__onScroll)
    if (success) {
      history.push('/')
      dispatch({ type: constants.client.LOGOUT_RESET })
      dispatch({ type: constants.product.LIST_CART_ITEMS_RESET })
    }
    !cartItems && dispatch(actions.products.listItems())
  }, [success, dispatch, cartItems])
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
            <div
              className={style.header__logo}
              onClick={() => history.push('/')}
            >
              <img src={gendy_logo} alt='logo' />
            </div>
            <div
              className={`${style.header__links} ${
                lang === 'ar' ? style.header__links_ar : ''
              }`}
              style={{
                left:
                  toggleMenu && lang === 'en'
                    ? '0'
                    : lang === 'en'
                    ? '-30rem'
                    : 'unset',
                right:
                  toggleMenu && lang === 'ar'
                    ? '0'
                    : lang === 'ar'
                    ? '-30rem'
                    : 'unset',
              }}
            >
              {/* NAVBAR ITEMS */}
              <ul className={style.header__list}>
                {isLoading
                  ? [...Array(5)].map((_) => (
                      <li
                        className={`${style.header__item} ${style.header__item_placeholder}`}
                      >
                        <Placeholder
                          className={style.header__link}
                          animation='wave'
                        />
                      </li>
                    ))
                  : navItems &&
                    navItems.map((item) => {
                      return (
                        <li
                          key={uuidv4()}
                          className={style.header__item}
                          onClick={toggleMenuHandler}
                        >
                          <span
                            onClick={() =>
                              !item.subItems.length &&
                              navigateTo(item.title['en'])
                            }
                            className={style.header__link}
                          >
                            {lang === 'ar'
                              ? item.title['ar']
                              : item.title['en']}
                          </span>
                          {item.subItems && (
                            <ul
                              className={`${style.header__subList} ${
                                lang === 'ar' ? style.header__subList_ar : ''
                              }`}
                            >
                              {item.subItems.map((subItem) => (
                                <li
                                  key={uuidv4()}
                                  className={style.header__subItem}
                                  onClick={() => setToggleMenu(false)}
                                >
                                  {/* <span style={{ paddingLeft: '1rem' }}><Person /></span> */}
                                  <Link
                                    to={`/products?type=${insertHyphens(
                                      subItem.title['en']
                                    )}`}
                                    className={style.header__subLink}
                                  >
                                    {lang === 'ar'
                                      ? subItem.title['ar']
                                      : subItem.title['en']}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
              </ul>
              <button onClick={() => setToggleMenu(false)}>
                <CloseSquare />
              </button>
            </div>
            <div className={style.header__actions}>
              <div className={style.header__search}>
                <div
                  style={styleSearchInput()}
                  className={style.header__search_input}
                >
                  <input
                    type='text'
                    onKeyDown={inputSearchHandler}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={lang === 'en' ? ' Search....' : 'بحث....'}
                  />
                </div>
                <span onClick={() => setIsToggle(!isToggle)}>
                  <Search />
                </span>
              </div>
              <span
                onClick={() => history.push('/order?process=cart')}
                style={{
                  position: 'relative',
                  marginRight: lang === 'ar' ? '1rem' : '0',
                }}
              >
                <span className={style.header__cart}>
                  {cartItems && cartItems.length}
                </span>
                <ShoppingCart />
              </span>
              <div
                className={`${style.header__signIn} ${
                  lang === 'ar' && isAuth ? style.header__signIn_ar : ''
                }`}
              >
                {isAuth ? (
                  <>
                    <span
                      onClick={() => history.push('/account#info')}
                      title='Profile'
                    >
                      <Person />
                    </span>
                    {loading ? (
                      <Loader size='4' />
                    ) : (
                      <span
                        style={{
                          marginLeft: lang === 'en' ? '1rem' : 'unset',
                          marginRight: lang === 'ar' ? '1rem' : 'unset',
                        }}
                        onClick={logoutHandler}
                        title='Logout'
                      >
                        <Logout />
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span onClick={() => history.push('/signup')}>
                      <Person />
                    </span>
                    <span
                      style={{
                        margin: lang === 'ar' ? '0 2rem 0 0' : '0 0 0 0.5rem',
                      }}
                      onClick={() => history.push('/login')}
                    >
                      {strings.header[lang].log}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* go to up icon */}
      <div className={style.header__up} ref={arrowRef}>
        <a href='#root'>
          {lang === 'en' ? 'UP' : 'أعلى'}
          <ArrowUp />
        </a>
      </div>

      {/* whats up icon */}
      <div className={style.header__whats}>
        <a
          href={`https://api.whatsapp.com/send?phone=+201064345626 &text=السلام عليكم`}
          target='_blank'
          rel='noreferrer'
        >
          <Whats />
        </a>
      </div>

      {/* icon routing to admin dashboard */}
      {isAuth && info.isAdmin && (
        <div
          className={style.header__dashboard}
          style={{ left: `${dashboardPosition}px` }}
        >
          <span onClick={dashboardPositionHandler}>
            {dashboardPosition === 0 ? <CloseSquare /> : <AdminCounter />}
          </span>
          <a href='https://admin.gendyecu.com' target='_blank' rel='noreferrer'>
            <AdminCounter />
          </a>
        </div>
      )}
    </>
  )
}
export default Nav

/**
 *
 *
 *
 */
