import React from 'react'
import style from './style.module.scss'


export const Overlay = ({toggle}) => <div style={{display:toggle ? 'block':'none'}} className={style.overlay}></div>

