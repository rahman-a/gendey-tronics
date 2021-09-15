import React, {useState} from 'react'
import style from './style.module.scss'
import Alert from 'react-bootstrap/Alert'
import {Link} from 'react-router-dom'

const Register = ({setPage}) => {
    const [formData, setFormData] = useState({})
    const [isAgree, setIsAgree] = useState(false)
    const [passConfirm, setPassConfirm] = useState(null)
    const [errors, setErrors] = useState([])
    const getFormData = e => {
        const data = {[e.target.name]:e.target.value}
        setFormData({...formData, ...data})
    }
    const formValidation = _ => {
        const dataArray = Object.keys(formData)
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'phone']
        const fieldErrors = []
        if(dataArray.length === 0){
            setErrors([`please provide the required data`])
            return false
        }
        requiredFields.forEach(field => {
            if(!(dataArray.includes(field))) {
                fieldErrors.push(`${field.toLocaleUpperCase()} is Required`)
            }
        })
        if(fieldErrors.length > 0){
            setErrors(fieldErrors)
            return false
        }
        requiredFields.forEach(field => {
            if(!formData[field]) {
                fieldErrors.push(`${field.toLocaleUpperCase()} is Required`)
            }
        })
        if(fieldErrors.length > 0){
            setErrors(fieldErrors)
            return false
        }
        if(formData['password'] !== passConfirm){
            setErrors(['Password doesn\'t match please try again'])
            return false
        }

        return true
    }
    const submitFormHandler = e => {
        e.preventDefault()
        if(formValidation()){
            setErrors([])
            console.log(formData)
        }
    }
    return (
        <div className={style.register}>
            <div className={style.register__header}>
                <h2>Sign Up for a new Account</h2>
                <p>Already have an account <span onClick={setPage}>sign in</span></p>
            </div>
            {errors.length > 0 && errors.map(
                (error, idx) => (
                    <Alert key={idx} variant='danger' style={{width:'70%', textAlign:'center'}}>{error}</Alert>
                ))}
            <form onSubmit={submitFormHandler}>
                <div className={style.register__group}>
                    <label>Full Name</label>
                    <div className={style.register__group_name}>
                        <input 
                        type="text" 
                        name='firstName'
                        onChange={(e) => getFormData(e)}
                        placeholder='enter your first name'/>
                        <input 
                        type="text" 
                        name='lastName'
                        onChange={(e) => getFormData(e)} 
                        placeholder='enter your last name'/>
                    </div>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="email">E-mail Address</label>
                    <input 
                    type="email" 
                    name='email' 
                    id='email'
                    onChange={(e) => getFormData(e)} 
                    placeholder='enter your email address'/>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="tel">Phone Number</label>
                    <input 
                    type="tel" 
                    name='phone' 
                    id='tel' 
                    onChange={(e) => getFormData(e)}
                    placeholder='enter your phone number '/>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name='password' 
                    id='password'
                    onChange={(e) => getFormData(e)} 
                    placeholder='enter your password '/>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="con_password">Confirm Password</label>
                    <input 
                    type="password" 
                    name='confirmPassword' 
                    id='con_password'
                    onChange={(e) => setPassConfirm(e.target.value)} 
                    placeholder='enter your password again'/>
                </div>
                <div className={style.register__options}>
                    <div className={style.register__options_terms}>
                        <input 
                        type="checkbox" 
                        name="agree" 
                        id="agree" 
                        onChange={() => setIsAgree(!isAgree)}/>
                        <label htmlFor="agree">I Agree all statements in</label>
                    </div>
                    <p>
                        <Link to='/terms-and-condition'>
                            terms of services 
                        </Link>
                        &nbsp;&&nbsp;
                        <Link to='/sales-terms'>
                            terms of sales!
                        </Link>
                    </p>
                </div>
                <button className={style.register__submit}>Sign up</button>
                <div className={style.register__alt}>
                    <p>Or sign up with <span></span></p>
                    <div className={style.register__int}>
                        <img src="images/fb.png" alt="facebook" />
                        <img src="images/google.png" alt="google" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
