import React, {useRef, useState} from 'react'
import style from  './style.module.scss'
import Select from './selectIcon'

const DropdownMenu = ({children, placeholder, value}) => {
    const wrapperRef = useRef(null)
    const listRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)
    
    const toggleMenuHandler = e => {
        if(!isToggle) {
            const menuHeight = listRef.current.getBoundingClientRect().height 
            wrapperRef.current.style.height = menuHeight + 'px'
            setIsToggle(true)
        }else {
            wrapperRef.current.style.height = 0
            setIsToggle(false)
        }
    }
    return (
        <div className={style.dropdown}>
            <input 
            type="text" 
            className={style.dropdown__input} 
            placeholder={placeholder} 
            value={value ? value : ''}/>
            <Select 
            toggleHandler={toggleMenuHandler} 
            name='select' 
            className={style.dropdown__icon}/>
                <div className={style.dropdown__wrapper} ref={wrapperRef}>
                    <ul className={style.dropdown__list} ref={listRef}>
                       {children}
                    </ul>
                </div>
            
        </div>
    )
}

export default DropdownMenu
