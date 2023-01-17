import React from 'react'
import style from './style.module.scss'
import {ArrowRight} from '../../icons'
import {Loader} from '../../components'
const Button = ({value, handler, loading}) => {
    return (
       <button 
       className={style.button}
       onClick={handler}
       >
           {loading ? <Loader size='4' center options={{animation:'border',}}/>
           : <p> {value} {value === 'next' && <ArrowRight/>} </p>}
        </button>
    )
}

export default Button
