import React from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import {CertificateStar, Earth, PlayCircle} from '../icons'
const CourseHeader = () => {
    return (
        <div className={style.header}>
            <figure className={style.header__figure}>
                <img src="/images/repair.jpg" alt="course background" />
            </figure>
            <div className={style.header__content}>
                <div className="container">
                    <div className={style.header__content_video}>
                        <figure>
                            <img src="/images/learn.jpg" alt="learn" />
                            <span>
                                <PlayCircle />
                            </span>
                        </figure>
                    </div>
                    <h1>engine management system</h1>
                    <p  className={style.header__description}>Lorem ipsum dolor sit amet, 
                        consetetur sadipscing elitr, sed diam nonumy eirmod 
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd 
                        gubergren,invidunt ut labore et dolore magna aliquyam erat, sed.
                    </p>
                    <div className={style.header__rating}>
                        <p className={style.header__rating_num}>
                            <span className={style.header__rating_num_value}>4.5</span>
                            <Rating rating={4.5}/>
                        </p>
                        <p className={style.header__rating_student}>
                            <span>(3060 rating)</span>
                            <span>37050 student</span>
                        </p>
                    </div>
                    <div className={style.header__creator}>
                        <p className={style.header__creator_name}>
                            Created by: Mohamed Elgendy 
                        </p>
                        <p className={style.header__creator_update}>
                          <span><CertificateStar/></span> Last Updated: 01/2022 
                          &nbsp; <span><Earth/></span>  Arabic
                        </p>
                    </div>
                    <div className={style.header__cta}>
                        <button>wishlist</button>
                        <button>share</button>
                        <button>gift this course</button>
                    </div>
                    <div className={style.header__coupon}>
                        <input type='text' name='coupon' placeholder='enter coupon' />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseHeader
