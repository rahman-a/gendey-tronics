import React, {useState, useEffect, useRef} from 'react'
import style from './style.module.scss'
import {Badge} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'


const Segment = ({value, title, icon, type, page, sales}) => {
    const [count, setCount] = useState(0)
    const increaseCount = useRef(null);
    const navigate = useHistory().push

    const mainColor = {
        primary: '#007bff',
        success: '#28a745',
        danger: '#dc3545',
        dark: '#343a40',
        secondary: '#6c757d', 
        info: '#17a2b8',
        warning: '#ffc107'
    }
    
    useEffect(() =>{
        increaseCount.current = setInterval(() => {
            setCount(prev => prev + 1)
        },5)
        return () => clearInterval(increaseCount.current)
    },[])

    useEffect(() => {
        if(count === value) {
              clearInterval(increaseCount.current)
        }
    },[count])
  return (
 
    <div className={style.dashboard__segment}
    style={{color:mainColor[type]}}
    onClick={() => navigate(page)}>
        <span>
            {icon}
        </span>
        <div className={style.dashboard__segment_info}>
            <div className={style.dashboard__segment_count}>
                <h3>{title}</h3>
                <p>
                    <Badge bg={type}> {count} </Badge>
                </p>
            </div>
            {sales > 0 && <div className={style.dashboard__segment_payment}>
                <h4 className='text-muted'> Total Sales </h4>
                <p style={{fontSize:'1.9rem', textAlign:'center'}}> 
                    <Badge style={{letterSpacing:'1.6px'}} bg='success'> {`${sales}$`} </Badge> 
                </p>
            </div> }
        </div>
    </div>
  )
}

export default Segment