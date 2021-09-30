import React, { useState } from 'react'
import style from './style.module.scss'
import {Overlay} from '../Overlay'
import {Modal} from '../Modal'
import {Link} from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
// import Loader from '../Loader'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [resetEmail, setResetEmail] = useState('')
    const [isRemembered, setIsRemembered] = useState(false)
    const [isPasswordForget, setIsPasswordForget] = useState(false)
    const getFormData = e => {
        const data = {[e.target.name]:e.target.value}
        setFormData({...formData, ...data})
    }
    const submitFormHandler = e => {
        e.preventDefault()
        console.log({...formData, isRemembered})
    }
    const resetPasswordHandler = e => {
        e.preventDefault()
        console.log(resetEmail)
    }
    return (
        <>
        <Overlay toggle={isPasswordForget}/>
        <Modal toggle={isPasswordForget} 
        closeHandler={() => setIsPasswordForget(false)}>
            {/* <Loader size='15' center/> */}
            {/* <Alert></Alert> */}
            <form onSubmit={resetPasswordHandler} className={style.login__reset}>
                <div className={style.login__group}>
                    <label htmlFor="reset">Enter your E-mail here</label>
                    <input 
                    type="email" 
                    name='email' 
                    id='reset' 
                    onChange={(e) => setResetEmail(e.target.value)}/>
                </div>
                <button type='submit' className={style.login__submit}>Send Reset Link</button>
            </form>
        </Modal>
        <div className={style.login}>
            <form onSubmit={submitFormHandler}>
                <div className={style.login__group}>
                    <label htmlFor="email">E-mail Address</label>
                    <input 
                    type="email" 
                    name='email' 
                    id='email'
                    onChange={(e) => getFormData(e)}
                    placeholder='enter your email address'/>
                </div>
                <div className={style.login__group}>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name='password' 
                    id='password'
                    onChange={(e) => getFormData(e)}
                    placeholder='enter your password '/>
                </div>
                <div className={style.login__options}>
                    <div className={style.login__options_remember}>
                        <input 
                        type="checkbox" 
                        name="isRemember" 
                        id="remember"
                        checked={isRemembered}
                        onChange={(e) =>setIsRemembered(!isRemembered)}/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <p onClick={() => setIsPasswordForget(true)}>Forget your password?</p>
                </div>
                <button className={style.login__submit}>Sign in</button>
                <div className={style.login__alt}>
                    <p>Or sign in with <span></span></p>
                    <div className={style.login__int}>
                        <img src="images/fb.png" alt="facebook" />
                        <img src="images/google.png" alt="google" />
                    </div>
                    <div className={style.login__signup}>
                        Don't have account? <Link to='/signup'>Create Account</Link>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login
