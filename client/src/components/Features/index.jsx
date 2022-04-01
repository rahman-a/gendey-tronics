import React from 'react'
import style from './style.module.scss'
import {PriceTags, BookOpen, Car, Timer} from '../icons'
import strings from '../../localization'
import { useSelector } from 'react-redux'

const Feature = () => {
    const {lang} = useSelector(state => state.language)
    return (
        <div className={style.feature}>
            <div className="container">
                <div className={style.feature__content} >
                    <div className={`${style.feature__hero} ${lang === 'ar' ?style.feature__hero_ar :''}`} data-aos='fade-right'>
                        <span>{strings.main[lang].feature_title}</span>
                        <h2>{strings.main[lang].feature_first_header}</h2>
                        <p>{strings.main[lang].feature_text}</p>
                        <h3>{strings.main[lang].feature_second_header}</h3>
                    </div>
                    <ul className={style.feature__list} data-aos='fade-up'>
                        <li className={style.feature__item}>
                            <span> <PriceTags/> </span>
                            <h3>{strings.main[lang].overview_online_courses_header}</h3>
                            <p>{strings.main[lang].overview_online_courses}</p>
                        </li>
                        <li className={style.feature__item}>
                            <span> <Timer/> </span>
                            <h3>{strings.main[lang].overview_support_included_header}</h3>
                            <p>{strings.main[lang].overview_support_included}</p>
                        </li>
                        <li className={style.feature__item}>
                            <span> <BookOpen/> </span>
                            <h3>{strings.main[lang].overview_books_included_header}</h3>
                            <p>{strings.main[lang].overview_books_included}</p>
                        </li>
                        <li className={style.feature__item}>
                            <span> <Car/> </span>
                            <h3>{strings.main[lang].overview_discount_included_header}</h3>
                            <p>{strings.main[lang].overview_discount_included}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Feature
