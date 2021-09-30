import React, {useState} from 'react'
import style from './style.module.scss'
import {Heart, HeartOutline} from '../icons'
import { useHistory } from 'react-router'

const Course = ({num, fav, width}) => {
    const [isLiked, setIsLiked] = useState(false)
    const history = useHistory()
    const setLikeHandler = e => {
        e.stopPropagation()
        setIsLiked(!isLiked)
    }
    return (
        <div className={style.courseCard} 
        onClick={() => history.push('/course')}
        style={{width: width ?width :'23%'}}>
          <figure>
              <img src="images/img-1.png" alt="engine" />
              {fav && <span onClick={(e) => setLikeHandler(e)}>
                {isLiked 
                ?<Heart/>
                :<HeartOutline/>}
              </span>}
          </figure>
          <div className={style.courseCard__content}>
                <h3>
                    ECM repairing and programming course {num}
                </h3>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Veritatis maxime deleniti unde maiores odio quaerat nulla a. 
                    Aliquid repellendus molestias vel aperiam velit
                </p>
                <button onClick={() => history.push('/course')}>READ MORE</button>
          </div>
        </div>
    )
}

export default Course
