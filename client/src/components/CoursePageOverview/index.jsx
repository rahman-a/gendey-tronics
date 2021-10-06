import React from 'react'
import style from './style.module.scss'
import {
  PlayCircle,
  File,
  Infinity,
  Download,
  DemandVideo,
  CertificateStar,
  Mobile,
} from '../icons'
import { useHistory, useLocation } from 'react-router-dom'

const CourseOverview = () => {
  const history = useHistory()
  const location = useLocation()
  console.log(location)
  return (
    <div className={style.overview}>
      <div className={style.overview__blur}></div>
      <div className={style.overview__content}>
        <div className={style.overview__video}>
          <figure>
            <img src='/images/learn.jpg' alt='learn' />
            <span>
              <PlayCircle />
            </span>
          </figure>
        </div>
        <div className={style.overview__cta}>
          <div className={style.overview__price}>
            <p>$298</p>
            <span>80% off</span>
          </div>
          <button onClick={() => history.push(`${location.pathname}/payment`)}>
            Enroll Now
          </button>
        </div>
        <div className={style.overview__info}>
          <div className='container'>
            <p>This Course includes:</p>
            <ul>
              <li>
                <span>
                  <DemandVideo />
                </span>
                3.5 hours on-demand videos
              </li>
              <li>
                <span>
                  <Download />
                </span>
                1 downloadable resource
              </li>
              <li>
                <span>
                  <File />
                </span>
                1 practice test
              </li>
              <li>
                <span>
                  <Infinity />
                </span>
                Full lifetime access
              </li>
              <li>
                <span>
                  <Mobile />
                </span>
                Access on mobile and TV
              </li>
              <li>
                <span>
                  <CertificateStar />
                </span>
                Certificate of completion
              </li>
            </ul>
            <div className={style.overview__coupon}>
              <input type='text' name='coupon' placeholder='enter coupon' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseOverview
