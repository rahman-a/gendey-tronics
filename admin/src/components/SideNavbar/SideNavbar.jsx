import React, {useState, useRef} from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import {Loader} from '../../components'
import {
    Cogs, 
    File, 
    Logout, 
    AddressCard, 
    CashRegister,
    HandshakeSlash
} from '../../icons'


const SideNavbar = ({
    showSideMenu
    }) => {
    const navigate = useHistory().push
    const [isReportMenu, setIsReportMenu] = useState(false)
    const [error, setError] = useState(false) // for test
    const [loading, setLoading] = useState(false) // for test
    const reportRef = useRef(null)


    const logoutHandler = e => {
        
    }
    
    const showReportsMenu = e => {
        e.stopPropagation()
        if(!isReportMenu) {
            const menuHeight = reportRef.current.getBoundingClientRect().height 
            reportRef.current.parentNode.style.height = `${menuHeight}px`
            setIsReportMenu(true) 
        }else {
            reportRef.current.parentNode.style.height = 0 
            setIsReportMenu(false)
        }
    }

    return (
        <>
        {error 
        && <div className={style.navbar__logout_alert}
        style={{left:error ?'1rem':'-25rem'}}>
            <p>This is Error From Server</p>
        </div> }

        <div className={style.navbar__menu}
        style={{left: showSideMenu ? '0' : '-30rem'}}>
            <ul className={style.navbar__menu_list}>
                <li className={style.navbar__menu_item}
                >
                    <div onClick={() => navigate('/')}>
                        <span>
                            <Cogs/>
                        </span>
                        <span>
                            Dashboard
                        </span>
                    </div>
                </li>
                <li className={style.navbar__menu_item}
                >
                    <div onClick={showReportsMenu}>
                        <span>
                            <File/>
                        </span>
                        <span>
                            Announcement
                        </span>
                    </div>
                    {/* ///////////////////////////////////// */}
                    <ul className={style.navbar__menu_reports}>
                        <div ref={reportRef}>
                            <li className={style.navbar__menu_reports_item}
                            onClick={() => navigate('/messages')}>
                                <span>
                                    <CashRegister/>
                                </span>
                                <span>
                                    Messages
                                </span>
                            </li>
                            <li className={style.navbar__menu_reports_item}
                            onClick={() => navigate('/notifications')}>
                                <span>
                                    <HandshakeSlash/>
                                </span>
                                <span>
                                    Notifications
                                </span>
                            </li>
                        </div>
                    </ul>
                    {/* ///////////////////////////////////// */}
                </li>
                <li className={style.navbar__menu_item}
                >
                   <div onClick={() => navigate('/profile')}>
                        <span>
                            <AddressCard/>
                        </span>
                        <span>
                            Profile
                        </span>
                   </div>
                </li>
                <li className={style.navbar__menu_item}
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
                </li>
            </ul>
        </div>
        </>
    )
}

export default SideNavbar

/**
 * 
 */
