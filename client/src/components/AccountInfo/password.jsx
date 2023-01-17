import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Alert  from 'react-bootstrap/Alert'
import Loader from '../Loader'

const Password = ({lang, strings}) => {
    const [editPass, setEditPass] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const {loading, error, message} = useSelector(state => state.updatePass)
    
    
    const clearAlerts = () => {
        setErrorMessage(null)
        dispatch({type: constants.client.UPDATE_PASSWORD_RESET})
    }
    
    const getPasswordHandler = e => {
        const data = {[e.target.name]:e.target.value}
        setEditPass({...editPass, ...data})
    }
    const submitHandler = e => {
        e.preventDefault()
        clearAlerts()
        if(editPass['newPassword'] !== editPass['confirmPassword']) {
            setErrorMessage(strings.client[lang].pass_nomatch)
            return
        }
        const data = {newPass:editPass['newPassword'], oldPass:editPass['oldPassword']}
        dispatch(actions.client.updatePass(data))
    }
    useEffect(() => {
        if(error || message) {
            window.scrollTo(0,500)
        }
       error && setErrorMessage(error)
    }, [error, message])
    return (
        <form className={`${style.accountInfo__pass} 
        ${lang === 'ar' ? style.accountInfo__pass_ar :''}`} onSubmit={submitHandler}>
           <div className={style.accountInfo__pass_group}>
            {
                errorMessage ? <Alert dismissible onClose={clearAlerts} variant='danger' style={{width:'max-content'}}>{errorMessage}</Alert>
                : message && <Alert dismissible onClose={clearAlerts} variant='success' style={{width:'max-content'}}>{message}</Alert>
            }
               <h3>{strings.client[lang].old_pass}</h3>
               <div className={style.accountInfo__pass_input}>
                   <label htmlFor="old_pass">{strings.client[lang].pass}</label>
                   <input 
                   type="password" 
                   name='oldPassword'
                   placeholder={strings.client[lang].old_pass_holder}
                   id='old_pass'
                   onChange={(e) => getPasswordHandler(e)}/>
               </div>
           </div>
           <div className={style.accountInfo__pass_group}>
               <h3>{strings.client[lang].new_pass}</h3>
               <div className={style.accountInfo__pass_input}>
                   <label htmlFor="new_pass">{strings.client[lang].pass}</label>
                   <input 
                   type="password" 
                   name='newPassword'
                   placeholder={strings.client[lang].new_pass_holder}
                   onChange={(e) => getPasswordHandler(e)}
                   id='new_pass'/>
               </div>
               <div className={style.accountInfo__pass_input}>
                   <label htmlFor="confirm_pass">{strings.client[lang].confirm_pass}</label>
                   <input 
                   type="password" 
                   name='confirmPassword'
                   placeholder={strings.client[lang].confirm_pass_holder}
                   onChange={(e) => getPasswordHandler(e)} 
                   id='confirm_pass'/>
               </div>
           </div>
           <div className={style.accountInfo__pass_group}>
               <div className={style.accountInfo__pass_input}
               style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                   <input type="submit" value={strings.client[lang].save}
                   disabled = {loading ? true : false}
                   style={{pointerEvents: loading ? 'none' : 'visible'}}/>
                   {loading && <Loader size='4.5'/>}
               </div>
           </div>
        </form>
    )
}

export default Password