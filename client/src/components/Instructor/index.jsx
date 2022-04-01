import React from 'react'
import style from './style.module.scss'
import { useSelector } from 'react-redux'
import strings from '../../localization'


const about = {
    en:[
        `He has studied Automotive Engineering.`,<br/>,
        `The Author of Autotronics Engineering which consist of four parts.`,<br/>,
        `He has trained about 400 technicians and Engineers in field.`,<br/>,
        `He has instructed Officers Engineers in the Armed Forces.`,<br/>,
        `Trained over that 500 technicians and Engineers.`,<br/>,
        `Experience over than six years in training Field.`
    ],
    ar:[
    ` درس هندسة ميكانيك السيارات`,<br/>,
    `مؤلف كتاب الكامل في هندسة الأوتوترونكس يقع في أربع أجزاء`, <br/>,
    `درب حوالي 400 فني ومهندس تدريب ميداني`, <br/>,
    `قدم دورات تدريبية للضباط المهندسين في القوات الجوية`,<br/>,
    `درب أكثر من 500 مهندس وفني أون لاين.`, <br/>,
        `خبرة لمدة ست سنوات في مجال التدريب`, <br/>
    ]
}

const Instructor = () => {
    const {lang} = useSelector(state => state.language)
    return (
        <div className={style.instructor}>
            <h2 data-aos='fade-down'>{strings.main[lang].instructor}</h2>
            <div className="container">
                <div className={style.instructor__content}>
                    <div 
                    className={style.instructor__about}
                    style={{direction: lang === 'ar' ? 'rtl':'ltr'}}
                    data-aos='fade-up'>
                        <h3>{lang === 'ar' ? 'محمد الجندى' :'Mohamed Elgendy' }</h3>
                        <p> {about[lang]} </p>
                        {/* <button>READ MORE</button> */}
                    </div>
                    <figure data-aos='fade-right'>
                        <img src="/images/instructor.png" alt="instructor" />
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default Instructor
