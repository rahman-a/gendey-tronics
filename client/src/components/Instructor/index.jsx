import React from 'react'
import style from './style.module.scss'
import { useSelector } from 'react-redux'
import strings from '../../localization'

const Instructor = () => {
    const {lang} = useSelector(state => state.language)
    return (
        <div className={style.instructor}>
            <h2 data-aos='fade-down'>{strings.main[lang].instructor}</h2>
            <div className="container">
                <div className={style.instructor__content}>
                    <div className={style.instructor__about} data-aos='fade-up'>
                        <h3>Mohamed Elgendy</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Tempore molestiae nam aut laborum vero reprehenderit qui inventore 
                            reiciendis alias error assumenda, aliquid accusamus maiores,
                             consequuntur, natus quia quae sit ut?
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Tempore molestiae nam aut laborum vero reprehenderit qui inventore 
                            reiciendis alias error assumenda, aliquid accusamus maiores,
                             consequuntur, natus quia quae sit ut?
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Tempore molestiae nam aut laborum vero reprehenderit qui inventore 
                            reiciendis alias error assumenda, aliquid accusamus maiores,
                             consequuntur, natus quia quae sit ut?
                        </p>
                        <button>READ MORE</button>
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
