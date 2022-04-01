import React from 'react'
import style from './style.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import {useDispatch } from 'react-redux'
import actions from '../../actions'
import msToTime from '../../utils'

const Message = ({email}) => {
  
  const dispatch = useDispatch()
  const navigate = useHistory().push
  const query = useLocation().search

  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  
  const cutText = (text, length) => {
    if (text.length > length) {
      const content = `${text.slice(0, length)}...`
      return stripHtml(content)
    }
    return stripHtml(text)
  }

  const loadEmailHandler = _ => {
     query 
     ? navigate(`/support/${email._id}${query}`) 
     : navigate(`/support/${email._id}`)
  }

  
  return (
    <div className={style.support__messages_item}
    onClick={loadEmailHandler}>
        <div className={style.support__messages_item_avatar}>
          <span style={{backgroundColor:'#F8C600'}}> 
            {email.sender[0].toLocaleUpperCase()} 
          </span>
        </div>
        <div className={style.support__messages_item_content}>
          <p style={{fontWeight:email.isRead  ? '400' : '900'}}> {email.from} </p>
          <p> {cutText(email.subject, 35)} </p>
        </div>
        <div className={style.support__messages_item_state}>
            <span> 
              {msToTime(email.createdAt)}
            </span>
            <span style={{backgroundColor:email.isRead ? '' : '#F8C600'}}>  </span>
        </div>
    </div>
  )
}

export default Message