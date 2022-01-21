import React, {useState} from 'react'
import style from './style.module.scss'
import {Modal} from 'react-bootstrap'
import {Lock, AtSymbol} from '../../icons'


const LoginForm = () => {
    const [isForget, setIsForget] = useState(false)

    return (
        <>
            <Modal show={isForget} onHide={() => setIsForget(false)}>
                <Modal.Header closeButton>
                    <h3 className={style.loginForm__reset_header}>
                        Enter Your Email to Reset Your Password
                    </h3>
                </Modal.Header>

                <Modal.Body>
                   
                </Modal.Body>

                <Modal.Footer>
                   
                </Modal.Footer>

            </Modal>

            <div className={style.loginForm}>
                <div className={style.loginForm__group}>
                    <span>
                        <AtSymbol/>
                    </span>
                    <input 
                    type="email" 
                    name='email'
                    placeholder='Enter Your E-mail'
                   />
                </div>
                <div className={style.loginForm__group}>
                    <span>
                        <Lock/>
                    </span>
                    <input 
                    type="password" 
                    placeholder='Enter Your Password'
                   />
                </div>
                <button 
                className={style.loginForm__submit}>
                  submit
                </button>
                <button 
                className={style.loginForm__forget}
                onClick={() => setIsForget(true)}>
                    forget password
                </button>
            </div>
        </>
    )
}

export default LoginForm
