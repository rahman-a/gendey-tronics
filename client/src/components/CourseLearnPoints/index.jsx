import React from 'react'
import style from './style.module.scss'
import {Check} from '../icons'

const points = [
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
]

const LearnPoints = () => {
    return (
        <div className={style.points}>
            <h2>What You will learn</h2>
            <ul className={style.points__list}>
                
                {
                    points.map((point, idx) => (
                     <li className={style.points__item} key={idx}>
                         <span> <Check/> </span>
                         {point}
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LearnPoints
