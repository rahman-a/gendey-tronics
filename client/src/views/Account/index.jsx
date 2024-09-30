import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import AccountInfo from '../../components/AccountInfo'
import Orders from '../../components/Orders'
import PurchasedCourses from '../../components/PurchasedCourses'
import FavouriteList from '../../components/FavouriteList'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import strings from '../../localization'
import { Helmet } from 'react-helmet-async'

const Account = () => {
  const accountAction = useLocation().hash.substr(1)
  const path = useLocation().pathname
  const history = useHistory()
  const { lang } = useSelector((state) => state.language)

  return (
    <Template>
      <Helmet>
        <title>Account Info</title>
      </Helmet>
      <div className={style.account}>
        <div className={style.account__header}>
          <div className={style.account__action}>
            <button
              className={`${style.account__btn} 
                        ${lang === 'ar' ? style.account__btn_ar : ''}`}
              onClick={() => history.push(`${path}#info`)}
            >
              {strings.client[lang].info}
            </button>

            <button
              className={`${style.account__btn} 
                        ${lang === 'ar' ? style.account__btn_ar : ''}`}
              onClick={() => history.push(`${path}#order`)}
            >
              {strings.client[lang].orders}
            </button>

            <button
              className={`${style.account__btn} 
                        ${lang === 'ar' ? style.account__btn_ar : ''}`}
              onClick={() => history.push(`${path}#course`)}
            >
              {strings.client[lang].courses}
            </button>

            <button
              className={`${style.account__btn} 
                        ${lang === 'ar' ? style.account__btn_ar : ''}`}
              onClick={() => history.push(`${path}#favourites`)}
            >
              {strings.client[lang].favourite}
            </button>
          </div>
        </div>
        <div className={style.account__content}>
          {accountAction === 'info' ? (
            <AccountInfo lang={lang} strings={strings} />
          ) : accountAction === 'order' ? (
            <Orders lang={lang} strings={strings} />
          ) : accountAction === 'course' ? (
            <PurchasedCourses lang={lang} strings={strings} />
          ) : (
            accountAction === 'favourites' && (
              <FavouriteList lang={lang} strings={strings} />
            )
          )}
        </div>
      </div>
    </Template>
  )
}

export default Account
