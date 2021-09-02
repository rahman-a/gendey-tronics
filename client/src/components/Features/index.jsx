import React from 'react'
import style from './style.module.scss'
import {PriceTags, BookOpen, Car, Timer} from '../icons'

const Feature = () => {
    return (
        <div className={style.feature}>
            <div className="container">
                <div className={style.feature__content} >
                    <div className={style.feature__hero} data-aos='fade-right'>
                        <span>Lorem ipsum dolor sit</span>
                        <h2>Enjoy the best</h2>
                        <p>courses in automotive</p>
                        <h3>engineering</h3>
                    </div>
                    <ul className={style.feature__list} data-aos='fade-up'>
                        <li className={style.feature__item}>
                            <span> <PriceTags/> </span>
                            <h3>Over 20,640 Free Tutorials</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur a
                                dipisicing elit.
                            </p>
                        </li>
                        <li className={style.feature__item}>
                            <span> <Timer/> </span>
                            <h3>Over 20,640 Free Tutorials</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur a
                                dipisicing elit.
                            </p>
                        </li>
                        <li className={style.feature__item}>
                            <span> <BookOpen/> </span>
                            <h3>Over 20,640 Free Tutorials</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur a
                                dipisicing elit.
                            </p>
                        </li>
                        <li className={style.feature__item}>
                            <span> <Car/> </span>
                            <h3>Over 20,640 Free Tutorials</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur a
                                dipisicing elit.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Feature
