import React from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'

const NotifyContainer = ({title, data, setToggleNotification, setToggleMessages}) => {
    const navigate = useHistory().push
    const navigateToPage = () => {
        
        title === 'Calls'
        ? setToggleNotification(false)
        : title === 'Contacts' && setToggleMessages(false)
        
        navigate(title === 'Calls'
        ? '/calls'
        : title === 'Contacts'
        && '/contacts')
    }

    const navigateToNotification = (phone, email) => {
        if(title === 'Calls') {
            navigate(`/calls?phone=${phone}`)
            setToggleNotification(false)
        }
        if(title === 'Contacts') {
            navigate(`/contacts?email=${email}`)
            setToggleMessages(false)
        }
    }

    console.log(`${title} Data`, data);

    return (
        <div className={style.notify__container}>
            <h4>{title}</h4>
            <ul className={style.notify__list}>
                {
                    data.map(notify => {
                        return <li 
                        key={notify.id} 
                        className={style.notify__item}
                        onClick={() => navigateToNotification(notify.phone, notify.email)}>
                            <h3>{notify.title}</h3>
                            <p>{notify.content.substr(0,45) + '....'}</p>
                        </li>
                    })
                }
            </ul>
            <button onClick={navigateToPage}>
                show all...
            </button>
        </div>
    )
}

export default NotifyContainer
