import React, {useEffect} from 'react'
import style from './style.module.scss'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

const Done = () => {
   const {order} = useSelector(state => state.newOrder)
   const history = useHistory()
   const path = useLocation().pathname
    
   useEffect(() => {
        !order && history.push(`${path}?process=cart`)
    },[order])
    
    return (
        <div className={style.done}>
            <h1>Done Page</h1>
        </div>
    )
}

export default Done
