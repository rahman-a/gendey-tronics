import React, {useState} from 'react'
import style from './style.module.scss'


const Info = () => {
    const [userInfo, setUserInfo] = useState({})
    
    const getUserInfoHandler = e => {
        const data = {[e.target.name]:e.target.value}
        setUserInfo({...userInfo, ...data})
    }
    
    const submitHandler = e => {
        e.preventDefault()
        console.log(userInfo)
    }
    return (
        <form className={style.accountInfo__info} onSubmit={submitHandler}>
            <div className={style.accountInfo__info_group}>
                <h3>Basic Information</h3>
                <div className="row">
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="first_name">First Name</label>
                        <input 
                        type="text" 
                        name="firstName" 
                        id="first_name"
                        placeholder='Write your First Name' 
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="last_name">Last Name</label>
                        <input 
                        type="text" 
                        name="lastName" 
                        id="last_name"
                        placeholder='Write your Last Name' 
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                </div>
               
            </div>
            <div className={style.accountInfo__info_group}>
                <h3>Address</h3>
                <div className="row">
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="city">City</label>
                        <input 
                        type="text" 
                        name="city" 
                        id="city"
                        placeholder='Write The City Name'  
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="country">Country</label>
                        <input 
                        type="text"
                        name="country" 
                        id="country"
                        placeholder='Write The Country Name' 
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                </div>
            </div>
            <div className={style.accountInfo__info_group}>
                <h3>Contact Information</h3>
                <div className="row">
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="mobile">Mobile</label>
                        <input 
                        type="text" 
                        name="mobile" 
                        id="mobile"
                        placeholder='Write your Mobile Number' 
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="email">E-mail</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='Write your E-mail Address' 
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                </div>
            </div>
            <div className={style.accountInfo__info_group}>
                <div className={style.accountInfo__info_input}>
                    <input type="submit" value='Save'/>
                </div>
            </div>
        </form>
    )
}

export default Info
