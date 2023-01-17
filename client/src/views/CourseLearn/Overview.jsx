import React from 'react'
import style from './style.module.scss'
import strings from '../../localization'

const Overview = ({data, lang}) => {
    const tm = (se) => {
        let h = (se /60 /60)
        if(h < 1){
           let  t =  (h * 100).toFixed(2) + ' minutes'
            return t 
        }
        if(h === 1) return h.toFixed(2) + ' hour'
        return h.toFixed(2)  + ' hours'
    }
    return (
        <div className={style.courseLearn__overview}>
            {/* <div className={style.courseLearn__overview_about}>
                <div className="container">
                    <h2>About this course</h2>
                    <p>{data.description}</p>
                </div>
            </div> */}
            <div className={style.courseLearn__overview_numbers}>
                <div className="container">
                    <div className={style.courseLearn__overview_numbers_wrapper}>
                        <h3>{strings.course[lang].by_numbers}</h3>
                        <ul>
                            <li>{strings.course[lang].skill_level}: {strings.course[lang].all_level}</li>
                            <li>{strings.course[lang].students}: {data.students}</li>
                            <li>{strings.course[lang].languages}: {data.language}</li>
                            <li>{strings.course[lang].caption}: {lang === 'en' ? 'NO':'غير متاح'}</li>
                            <li>{strings.course[lang].lectures}: {data.lessons}</li>
                            <li>{strings.course[lang].videos}: {tm(data.duration)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.courseLearn__overview_features}>
            <div className="container">
                    <div className={style.courseLearn__overview_features_wrapper}>
                        <h3>{strings.course[lang].features}</h3>
                        <ul>
                            <li>
                                {lang === 'en' ? 'Available on iOS and Android' : 'iOS متاح على نظام الاندرويد ونظام  '}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.courseLearn__overview_description}>
                <div className="container">
                    <h3>{strings.course[lang].description}</h3>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Overview
