import React, {useState} from 'react'
import style from './style.module.scss'
import {Heart, HeartOutline} from '../icons'

const Course = ({num, fav}) => {
    const [isLiked, setIsLiked] = useState(false)
    return (
        <div className={style.courseCard}>
          <figure>
              <img src="images/img-1.png" alt="engine" />
              {fav && <span onClick={() => setIsLiked(!isLiked)}>
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
                <button>READ MORE</button>
          </div>
        </div>
    )
}

export default Course
