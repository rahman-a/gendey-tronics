import React, {useState} from 'react'
import style from './style.module.scss'

const Password = () => {
    const [editPass, setEditPass] = useState({})
    
    const getPasswordHandler = e => {
        const data = {[e.target.name]:e.target.value}
        setEditPass({...editPass, ...data})
    }
    const submitHandler = e => {
        e.preventDefault()
        if(editPass['newPassword'] !== editPass['confirmPassword']) {
            alert('The Password isn\'t Match please try again')
            return
        }
        console.log(editPass)
    }
    return (
        <form className={style.accountInfo__pass} onSubmit={submitHandler}>
           <div className={style.accountInfo__pass_group}>
               <h3>Old Password</h3>
               <div className={style.accountInfo__pass_input}>
                   <label htmlFor="old_pass">Password</label>
                   <input 
                   type="password" 
                   name='oldPassword'
                   placeholder='Type the old password'
                   id='old_pass'
                   onChange={(e) => getPasswordHandler(e)}/>
               </div>
           </div>
           <div className={style.accountInfo__pass_group}>
               <h3>New Password</h3>
               <div className={style.accountInfo__pass_input}>
                   <label htmlFor="new_pass">Password</label>
                   <input 
                   type="password" 
                   name='newPassword'
                   placeholder='Type the new password'
                   onChange={(e) => getPasswordHandler(e)}
                   id='new_pass'/>
               </div>
               <div className={style.accountInfo__pass_input}>
                   <label htmlFor="confirm_pass">Confirm Password</label>
                   <input 
                   type="password" 
                   name='confirmPassword'
                   placeholder='Type the new password again'
                   onChange={(e) => getPasswordHandler(e)} 
                   id='confirm_pass'/>
               </div>
           </div>
           <div className={style.accountInfo__pass_group}>
               <div className={style.accountInfo__pass_input}>
                   <input type="submit" value='save'/>
               </div>
           </div>
        </form>
    )
}

export default Password