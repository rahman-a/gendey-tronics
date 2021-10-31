import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import AccountInfo from '../../components/AccountInfo'
import Orders from '../../components/Orders'
import PurchasedCourses from '../../components/PurchasedCourses'
import FavouriteList from '../../components/FavouriteList'
import { useLocation, useHistory } from 'react-router-dom'

const Account = () => {
    const accountAction = useLocation().hash.substr(1)
    const path = useLocation().pathname
    const history = useHistory() 
    return (
        <Template>
            <div className={style.account}>
                <div className={style.account__header}>
                    <div className={style.account__action}>
                        <button 
                        className={style.account__btn}
                        onClick={() => history.push(`${path}#info`)}>
                            My Info
                        </button>
                        <button 
                        className={style.account__btn}
                        onClick={() => history.push(`${path}#order`)}>
                            Orders
                        </button>
                        <button 
                        className={style.account__btn}
                        onClick={() =>history.push(`${path}#course`)}>
                            Courses
                        </button>
                        <button 
                        className={style.account__btn}
                        onClick={() => history.push(`${path}#favourites`)}>
                            Favourites
                        </button>
                    </div>
                </div>
                <div className={style.account__content}>
                    {
                        accountAction === 'info'
                        ? <AccountInfo/>
                        : accountAction === 'order'
                        ? <Orders/>
                        : accountAction === 'course'
                        ? <PurchasedCourses/>
                        : accountAction === 'favourites'
                        && <FavouriteList/>
                    }
                   
                </div>
            </div>
        </Template>
    )
}

export default Account
