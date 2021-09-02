import React from 'react'
import style from './style.module.scss'

const Instructor = () => {
    return (
        <div className={style.instructor}>
            <h2 data-aos='fade-down'>Meet our instructor</h2>
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
                </div>
            </div>
        </div>
    )
}

export default Instructor
