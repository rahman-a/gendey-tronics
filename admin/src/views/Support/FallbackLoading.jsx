import React from 'react'
import style from './style.module.scss'
import {Placeholder} from 'react-bootstrap'

export const FallbackLoading = () => {
  return (
    <div className={style.support__messages_item}>
        <div className={style.support__messages_item_avatar}>
            <span style={{width:'4rem', height:'2rem', backgroundColor:'#ccc'}}>
                <Placeholder animation='glow'>
                    <Placeholder xs={12} />
                </Placeholder>
            </span>
        </div>
        <div className={style.support__messages_item_content}
        style={{width:'100%', display:'block'}}>
            <Placeholder as='h3' animation='glow'>
                <Placeholder xs={12}/>
            </Placeholder>
            <Placeholder as='p' animation='glow'>
                <Placeholder xs={12}/>
            </Placeholder>
        </div>
        <div className={style.support__messages_item_state}></div>
    </div>
  )
}
