import React, {useState} from 'react'
import style from './style.module.scss'
import {v4 as uuidv4} from 'uuid'
import {Button, Badge} from 'react-bootstrap'
import {Rating, Reviews} from '../../components'
import {Star} from '../../icons'


const RatingStar = ({repeat}) => {
    return (
        [...Array(repeat)].map((_, idx) =>(
            <span key={idx}>
                <Star/>
            </span>
        ) ) 
    )
}

const CourseRating = ({data}) => {
    
    const [isReviews, setIsReviews] = useState(false)
 
    
    
    return (
        <div className={style.rating}>

            <Reviews
            isReviews={isReviews}
            setIsReview={setIsReviews}
            reviews={data.reviews}
            />


            <div className={style.rating__overall}>
                <h2>{data.rating}</h2>
                <Rating rating={data.rating}/>
                <p>rating</p>
                {
                    data.reviews.length 
                    ? <Button variant='warning' onClick={() => setIsReviews(true)}>
                        show reviews
                      </Button> 
                    : <Badge bg='danger'>No Reviews yet</Badge>
                }
            </div>
            <div className={style.rating__progress}>
                {
                    data.ratingValues.map((r, idx) => (
                        <div className={style.rating__progress_wrapper} key={uuidv4()}>
                            <div className={style.rating__progress_bar} key={idx}>
                                <div style={{width:`${r}%`}}></div>
                            </div>
                            <div className={style.rating__progress_stars}>
                                <div className={style.rating__progress_stars_count}>
                                    <RatingStar repeat={5 - idx}/>
                                </div>
                                <p>{r}%</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseRating
