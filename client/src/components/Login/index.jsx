import React, { useState } from 'react'
import style from './style.module.scss'
import {Overlay} from '../Overlay'
import {Modal} from '../Modal'
import GoogleSignin from '../GoogleSignin'
import FacebookSignIn from '../FacebookSignIn'
import {Link, useHistory, useLocation} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Loader from '../Loader'
import {useSelector, useDispatch} from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import { useEffect } from 'react'
import strings from '../../localization'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [resetEmail, setResetEmail] = useState('')
    const [isRemembered, setIsRemembered] = useState(false)
    const [isPasswordForget, setIsPasswordForget] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const {lang} = useSelector(state => state.language)
    const {loading, error, info} = useSelector(state => state.client)
    const {loading:re_loading, error:re_error, message} = useSelector(state => state.resetLinkPass)
    const dispatch = useDispatch()
    const history = useHistory()
    const redirect = new URLSearchParams(useLocation().search).get('redirect')
    const getFormData = e => {
        const data = {[e.target.name]:e.target.value}
        setFormData({...formData, ...data})
    }
    const submitFormHandler = e => {
        e.preventDefault()
        dispatch(actions.client.login(formData))
    }
    
    const submitResetPassword = () => {
        dispatch(actions.client.resetLink({email:resetEmail}))
    }

    const clearResetPassAlerts = () => {
        setErrorMessage(null)
        dispatch({type:constants.client.RESET_PASSWORD_LINK_RESET})
    }
    useEffect(() => {
        error && setErrorMessage(error)
        re_error && setErrorMessage(re_error)
        if(info) {
            if(redirect) {
             history.push(redirect)
             return
            }
            history.push('/')
        } 
    },[error, info, history, re_error, redirect])
    return (
        <>
        <Overlay toggle={isPasswordForget}/>
        <Modal toggle={isPasswordForget} 
        closeHandler={() => setIsPasswordForget(false)}>
            {
                errorMessage 
                ? <Alert variant='danger' dismissible
                onClose={clearResetPassAlerts}>{errorMessage}</Alert>
                : re_loading ? <Loader size='10' center/>
                : message && <Alert variant='success' dismissible
                onClose={clearResetPassAlerts}>{message}</Alert>
            }
            <form className={style.login__reset}>
                <div className={style.login__group}>
                    <label htmlFor="reset">{strings.client[lang].email_enter}</label>
                    <input 
                    type="email" 
                    name='email' 
                    id='reset' 
                    onChange={(e) => setResetEmail(e.target.value)}/>
                </div>
                <button type='submit'
                 className={style.login__submit}
                 onClick={submitResetPassword}
                 disabled={re_loading ? true : false}
                 style={{pointerEvents:re_loading ? 'none':'visible'}}>{strings.client[lang].reset_link}</button>
            </form>
        </Modal>
        <div className={style.login}>
            {
                errorMessage && <Alert style={{width:'70%', textAlign:'center'}} variant='danger'>{errorMessage}</Alert>
            }
            <form onSubmit={submitFormHandler}>
                <div className={style.login__group}>
                    <label htmlFor="email">{strings.client[lang].email_address}</label>
                    <input 
                    type="email" 
                    name='email' 
                    id='email'
                    onChange={(e) => getFormData(e)}
                    placeholder={strings.client[lang].email_holder}/>
                </div>
                <div className={style.login__group}>
                    <label htmlFor="password">{strings.client[lang].pass}</label>
                    <input 
                    type="password" 
                    name='password' 
                    id='password'
                    onChange={(e) => getFormData(e)}
                    placeholder={strings.client[lang].pass_holder}/>
                </div>
                <div className={style.login__options}>
                    <div className={style.login__options_remember}>
                        <input 
                        type="checkbox" 
                        name="isRemember" 
                        id="remember"
                        checked={isRemembered}
                        onChange={(e) =>setIsRemembered(!isRemembered)}/>
                        <label htmlFor="remember"
                        style={{marginRight:lang === 'ar' ? '0.5rem':'0'}}>{strings.client[lang].remember_me}</label>
                    </div>
                    <p onClick={() => setIsPasswordForget(true)}>{strings.client[lang].pass_forget}</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <button disabled={loading ? true : false} className={style.login__submit}>{strings.client[lang].sign_in}</button>
                    {loading && <Loader size='5'/>}
                </div>
                <div className={style.login__alt}>
                    <p>{strings.client[lang].or_signin} <span></span></p>
                    <div className={`${style.login__int} ${lang === 'ar' ? style.login__int_ar:''}`}>
                        <FacebookSignIn text='Sign in with Facebook'/>
                        <GoogleSignin text='Sign in with Google'/>
                    </div>
                    <div className={style.login__signup}>
                    {strings.client[lang].no_account} 
                    <Link to='/signup' style={{
                        marginLeft:lang === 'ar' ? 'unset' :'1.5rem',
                        marginRight:lang==='ar' ? '1.5rem':'unset'
                        }}>
                        {strings.client[lang].new_account}
                    </Link>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login
