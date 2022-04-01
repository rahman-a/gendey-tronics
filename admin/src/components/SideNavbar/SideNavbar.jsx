import React, {useState, useRef, useEffect} from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import actions from '../../actions'
import {Loader} from '../../components'
import {
    Home,
    Users,
    Chalkboard,
    Car,
    TruckLoading,
    Newspaper,
    PlusSquare,
    Table,
    Logout,
    HardDrive,
    AtSymbol,
    Slider
} from '../../icons'


const SideNavbar = ({
    showSideMenu,
    setSideMenu
    }) => {
    const navigate = useHistory().push
    const [isReportMenu, setIsReportMenu] = useState(false)
    const productRef = useRef(null)
    const courseRef = useRef(null)
    const blogRef = useRef(null)
    const {loading, error , isLogout} = useSelector(state => state.logout)
    const dispatch = useDispatch()

    const logoutHandler = e => {
        e.stopPropagation()
        dispatch(actions.admin.logout())
    }
    
    const showReportsMenu = (e,ref) => {
        e.stopPropagation()
        if(!isReportMenu) {
            const menuHeight = ref.current.getBoundingClientRect().height 
            ref.current.parentNode.style.height = `${menuHeight}px`
            setIsReportMenu(true) 
        }else {
            ref.current.parentNode.style.height = 0 
            setIsReportMenu(false)
        }
    }

    useEffect(() => {
       if( isLogout ) {
        setSideMenu(false)
        navigate('/login')
       } 
    },[isLogout])

    return (
        <>
        <div className={style.navbar__logout_alert}
        style={{left:error ?'1rem':'-25rem'}}>
            <p>{error}</p>
        </div> 

        <div className={style.navbar__menu}
        style={{left: showSideMenu ? '0' : '-30rem'}}>
            <ul className={style.navbar__menu_list}>
                
                {/* MAIN PAGE */}
                <li className={style.navbar__menu_item}
                >
                    <div onClick={() => navigate('/')}>
                        <span>
                            <Home/>
                        </span>
                        <span>
                            HOME
                        </span>
                    </div>
                </li>

                {/* USERS PAGE */}
                <li className={style.navbar__menu_item}
                >
                    <div onClick={() => navigate('/users')}>
                        <span>
                            <Users/>
                        </span>
                        <span>
                            Users
                        </span>
                    </div>
                </li>
                
                
                {/* PRODUCTS MENU */}
                <li className={style.navbar__menu_item}
                >
                    <div onClick={(e) => showReportsMenu(e,productRef)}>
                        <span>
                            <Car/>
                        </span>
                        <span>
                            Products
                        </span>
                    </div>
                    {/* ///////////////////////////////////// */}
                    <ul className={style.navbar__menu_dropdown}>
                        <div ref={productRef}>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/products')}>
                                <span>
                                    <Table/>
                                </span>
                                <span>
                                    Products
                                </span>
                            </li>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/products/orders')}>
                                <span>
                                    <TruckLoading/>
                                </span>
                                <span>
                                    Orders
                                </span>
                            </li>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/products/new')}>
                                <span>
                                    <PlusSquare/>
                                </span>
                                <span>
                                    New Product
                                </span>
                            </li>
                        </div>
                    </ul>
                    {/* ///////////////////////////////////// */}
                </li>


               {/* COURSES MENU */}
               <li className={style.navbar__menu_item}
                >
                    <div onClick={(e) => showReportsMenu(e,courseRef)}>
                        <span>
                            <Chalkboard/>
                        </span>
                        <span>
                            Courses
                        </span>
                    </div>
                    {/* ///////////////////////////////////// */}
                    <ul className={style.navbar__menu_dropdown}>
                        <div ref={courseRef}>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/courses')}>
                                <span>
                                    <Table/>
                                </span>
                                <span>
                                    Courses
                                </span>
                            </li>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/courses/new')}>
                                <span>
                                    <PlusSquare/>
                                </span>
                                <span>
                                    New Course
                                </span>
                            </li>
                        </div>
                    </ul>
                    {/* ///////////////////////////////////// */}
                </li>

                
                {/* BLOGS MENU */}
                <li className={style.navbar__menu_item}
                >
                    <div onClick={(e) => showReportsMenu(e,blogRef)}>
                        <span>
                            <Newspaper/>
                        </span>
                        <span>
                            Blogs
                        </span>
                    </div>
                    {/* ///////////////////////////////////// */}
                    <ul className={style.navbar__menu_dropdown}>
                        <div ref={blogRef}>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/blogs')}>
                                <span>
                                    <Table/>
                                </span>
                                <span>
                                    Blogs
                                </span>
                            </li>
                            <li className={style.navbar__menu_dropdown_item}
                            onClick={() => navigate('/blogs/new')}>
                                <span>
                                    <PlusSquare/>
                                </span>
                                <span>
                                    New Blog
                                </span>
                            </li>
                        </div>
                    </ul>
                    {/* ///////////////////////////////////// */}
                </li>

                {/* ////////////// Website Assets //////////// */}


                <li className={style.navbar__menu_item}
                >
                    <div onClick={() => navigate('/drive')}>
                        <span>
                            <HardDrive/>
                        </span>
                        <span>
                            Drive
                        </span>
                    </div>
                </li>

                {/* Support */}
                <li className={style.navbar__menu_item}
                >
                    <div onClick={() => navigate('/support')}>
                        <span>
                            <AtSymbol/>
                        </span>
                        <span>
                            Support
                        </span>
                    </div>
                </li>

                {/* Slider Control */}
                <li className={style.navbar__menu_item}
                >
                    <div onClick={() => navigate('/sliders')}>
                        <span>
                            <Slider/>
                        </span>
                        <span>
                            Slider
                        </span>
                    </div>
                </li>

                {/* ////////////////////////////////////////// */}
                
                {/* <li className={style.navbar__menu_item}
                >
                    <div onClick={logoutHandler}>
                       {loading && <span className={style.navbar__menu_item_loading}>
                            <Loader center size='5' options={{animation:'border'}}/>
                        </span>} 
                        <span className={style.navbar__menu_item_logout}>
                            <Logout/>
                        </span>
                        <span>
                            Logout
                        </span>
                    </div>
                </li> */}
            </ul>
        </div>
        </>
    )
}

export default SideNavbar

/**
 * 
 */
