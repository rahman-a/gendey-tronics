import React, {useState} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Login from '../../components/Login'
import Register from '../../components/Register'

const Credential = () => {
    const [loginPage, setLoginPage] = useState('login')
    return (
        <Template>
            <div className={style.credential}>
                <div className="container">
                    <div className={style.credential__wrapper}>
                        <figure>
                            <img src="images/engine.png" alt="engine" />
                        </figure>
                        {loginPage === 'login'
                        ? <Login setPage={() => setLoginPage('register')}/>
                        : loginPage === 'register' 
                        && <Register setPage={() => setLoginPage('login')}/>}
                    </div>
                </div>
            </div>
        </Template>
        
    )
}

export default Credential
