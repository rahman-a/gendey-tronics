import React from 'react'
import style from './style.module.scss'

const ProgressBar = ({width, text}) => {
  return (
    <div className={style.progress}>
        <span style={{width:`${width}%`}}></span>   
        <p>{text}</p>
    </div>
  )
}

export default ProgressBar