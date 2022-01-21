import React from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import {LoginForm} from '../../components'
import {ArrowRight} from '../../icons'

const Login = () => {

    const navigate = useHistory().push

    return (
        <div className={style.login}>
            {/* <button className={style.login__back} onClick={() => navigate('/')}>
                <span>
                    <ArrowRight/>
                </span>
                back to home
            </button> */}
           <div className={style.login__wrapper}>
             <LoginForm/>
           </div>
        </div>
    )
}

export default Login
