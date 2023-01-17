import React from 'react'
import {Star, StarEmpty, StarHalf} from '../../icons'

const Rating = ({rating, color}) => {
    return (
        <>
          <span style={{color: color ? color : '#F8C600'}}>
              {
              rating === 0
              ?<StarEmpty/>
              :rating > 0 && rating  <= 0.5 
              ?<StarHalf/>
              :<Star/>
              }
          </span>
          <span style={{color: color ? color : '#F8C600'}}>
              {
              rating <= 1 && rating < 1.5
              ?<StarEmpty/>
              :rating  <= 1.5 
              ?<StarHalf/>
              :<Star/>
              }
          </span>
          <span style={{color: color ? color : '#F8C600'}}>
              {
              rating <= 2 && rating < 2.5
              ?<StarEmpty/>
              :rating  <= 2.5 
              ?<StarHalf/>
              :<Star/>
              }
          </span>
          <span style={{color: color ? color : '#F8C600'}}>
              {
              rating <= 3 && rating < 3.5
              ?<StarEmpty/>
              :rating  <= 3.5 
              ?<StarHalf/>
              :<Star/>
              }
          </span>
          <span style={{color: color ? color : '#F8C600'}}>
              {
              rating <= 4 && rating < 4.5
              ?<StarEmpty/>
              :rating  <= 4.5 
              ?<StarHalf/>
              :<Star/>
              }
          </span>
        </>
    )
}

export default Rating