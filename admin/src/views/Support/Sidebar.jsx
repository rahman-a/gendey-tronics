import React from 'react'
import style from './style.module.scss'
import {useHistory, useLocation} from 'react-router-dom'
import {Inbox, PaperPlane, BoxArchive, Star} from '../../icons'

const Sidebar = ({inbox}) => {
  const navigate = useHistory().push
  const query = useLocation().search
  const tab = new URLSearchParams(query)

  const changeCurrentTab = (tab) => {
    tab ? navigate(`/support?${[tab]}=true`) : navigate('/support')
  }
  
    return (
    <ul className={style.support__actions_list}>
        <li className={`${style.support__actions_item} 
                        ${!query ? style.support__actions_item_current :''}`}
            onClick={() => changeCurrentTab(null)}>

            <span> <Inbox /> Inbox </span>
           {inbox ? <em> {inbox < 100 ? inbox : `${99}+`} </em> : null} 
        </li>
        <li className={`${style.support__actions_item} 
                        ${tab.has('isSent') ? style.support__actions_item_current :''}`}
            onClick={() => changeCurrentTab('isSent')}>

            <span> <PaperPlane /> Sent </span>
        </li>
        <li className={`${style.support__actions_item} 
                        ${tab.has('isStarred') ? style.support__actions_item_current :''}`}
            onClick={() => changeCurrentTab('isStarred')}>

            <span> <Star /> Starred </span>
        </li>
        <li className={`${style.support__actions_item} 
                        ${tab.has('isArchived') ? style.support__actions_item_current :''}`}
            onClick={() => changeCurrentTab('isArchived')}>

            <span> <BoxArchive /> Archive </span>
        </li>
    </ul>
  )
}

export default Sidebar