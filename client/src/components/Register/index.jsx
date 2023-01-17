import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Alert from 'react-bootstrap/Alert'
import Loader from '../Loader'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import actions from '../../actions'
import GoogleSignin from '../GoogleSignin'
import FacebookSignIn from '../FacebookSignIn'
import strings from '../../localization'
import constants from '../../constants'

const Register = () => {
    const [formData, setFormData] = useState({})
    const [isAgree, setIsAgree] = useState(false)
    const [passConfirm, setPassConfirm] = useState(null)
    const [errors, setErrors] = useState([])
    const [successMessage, setSuccessMessage] = useState(null)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
    const {loading, error, message}  = useSelector(state => state.register)
    const {isAuth}  = useSelector(state => state.client)
    const {lang}  = useSelector(state => state.language)
    const dispatch = useDispatch()
    const history = useHistory()

    const getFormData = e => {
        if(e.target.name === 'password') {
            const expiration =/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g
            const isMatch = expiration.test(e.target.value)
            isMatch 
            ? setIsPasswordInvalid(false) 
            : setIsPasswordInvalid(true)
        }
        const data = {[e.target.name]:e.target.value}
        setFormData({...formData, ...data})
    }
    const formValidation = _ => {
        const dataArray = Object.keys(formData)
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'phoneNumber']
        const fieldSyn = {
            firstName:strings.client[lang].first_name,
            lastName:strings.client[lang].last_name,
            email:strings.client[lang].email_address,
            password:strings.client[lang].pass,
            phoneNumber:strings.client[lang].phone
        }
        const fieldErrors = []
        if(dataArray.length === 0){
            setErrors([strings.client[lang].provide_data])
            return false
        }
        requiredFields.forEach(field => {
            if(!(dataArray.includes(field))) {
                fieldErrors.push(`${strings.client[lang].is_required} ${fieldSyn[field]}`)
            }
        })
        if(fieldErrors.length > 0){
            setErrors(fieldErrors)
            return false
        }
        requiredFields.forEach(field => {
            if(!formData[field]) {
                fieldErrors.push(`${strings.client[lang].is_required} ${fieldSyn[field]}`)
            }
        })
        if(fieldErrors.length > 0){
            setErrors(fieldErrors)
            return false
        }
        if(formData['password'] !== passConfirm){
            setErrors([strings.client[lang].pass_nomatch])
            return false
        }

        if(!isAgree) {
            setErrors([strings.client[lang].is_agree])
            return false
        }

        return true
    }
    useEffect(() => {
        errors.length && window.scrollTo(0,0)
        return () => {
            dispatch({type:constants.client.REGISTER_RESET})
        }
    }, [errors])
    
    useEffect(() => {
        if(error || message) {
            window.scrollTo(0,0)
            error && setErrors([...errors, error])
            message && setSuccessMessage(message)
        }
        isAuth && history.push('/')
    }, [error, message,isAuth, history])
    const submitFormHandler = e => {
        e.preventDefault()
        if(formValidation()){
            setErrors([])
            setSuccessMessage(null)
            dispatch(actions.client.register(formData))
        }
    }
    return (
        <div className={style.register}>
            <div className={style.register__header}>
                <h2>{strings.client[lang].new_signup}</h2>
                <p>{strings.client[lang].already_user} <Link to='/login'>{strings.client[lang].sign_in}</Link></p>
            </div>
            {errors.length > 0 && errors.map(
                (error, idx) => (
                    <Alert key={idx} variant='danger' style={{width:'70%', textAlign:'center'}}>{error}</Alert>
                ))}
            {
            successMessage && <Alert variant='success' style={{width:'70%', textAlign:'center'}}>{successMessage}</Alert>
            }
            <form className={`${style.register__form} ${lang === 'ar' ?style.register__form_ar :''}`} 
            onSubmit={submitFormHandler}>
                <div className={style.register__group}>
                    <label>{strings.client[lang].full_name}</label>
                    <div className={`${style.register__group_name} ${lang === 'ar' ? style.register__group_name_ar :''}`}>
                        <input 
                        type="text" 
                        name='firstName'
                        onChange={(e) => getFormData(e)}
                        placeholder={strings.client[lang].first_name_holder}/>
                        <input 
                        type="text" 
                        name='lastName'
                        onChange={(e) => getFormData(e)} 
                        placeholder={strings.client[lang].last_name_holder}/>
                    </div>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="email">{strings.client[lang].email_address}</label>
                    <input 
                    type="email" 
                    name='email' 
                    id='email'
                    onChange={(e) => getFormData(e)} 
                    placeholder={strings.client[lang].email_holder}/>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="tel">{strings.client[lang].phone}</label>
                    <input 
                    type="tel" 
                    name='phoneNumber' 
                    id='tel' 
                    onChange={(e) => getFormData(e)}
                    placeholder={strings.client[lang].phone_holder}/>
                </div>
                <div className={`${style.register__group} 
                ${isPasswordInvalid ? style.register__group_invalid : ''}`}>
                    <label htmlFor="password">{strings.client[lang].pass}</label>
                    <input 
                    type="password" 
                    name='password' 
                    id='password'
                    onChange={(e) => getFormData(e)} 
                    placeholder={strings.client[lang].pass_holder}/>
                    <span className={style.register__group_mute}>{strings.client[lang].pass_rule}</span>
                </div>
                <div className={style.register__group}>
                    <label htmlFor="con_password">{strings.client[lang].confirm_pass}</label>
                    <input 
                    type="password" 
                    name='confirmPassword' 
                    id='con_password'
                    onChange={(e) => setPassConfirm(e.target.value)} 
                    placeholder={strings.client[lang].confirm_pass_holder}/>
                </div>
                <div className={style.register__options}>
                    <div className={style.register__options_terms}>
                        <input 
                        type="checkbox" 
                        name="agree" 
                        id="agree" 
                        onChange={() => setIsAgree(!isAgree)}/>
                        <label htmlFor="agree" style={{marginRight: lang === 'ar' ? '0.5rem' :'0'}}>
                            {strings.client[lang].agree_statement}
                        </label>
                    </div>
                    <p>
                        <Link to='/terms-and-condition'>
                        {strings.client[lang].terms_of_service}
                        </Link>
                        &nbsp;&&nbsp;
                        <Link to='/sales-terms'>
                        {strings.client[lang].terms_of_sales}
                        </Link>
                    </p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <button disabled={loading ? true : false} className={style.register__submit}>{strings.client[lang].sign_up}</button>
                    {loading && <Loader size='5'/>}
                </div>
                <div className={style.register__alt}>
                    <p>{strings.client[lang].or_signup} <span></span></p>
                    <div className={`${style.register__int} ${lang === 'ar' ? style.register__int_ar :''}`}>
                        <FacebookSignIn text='Sign up with Facebook'/>
                        <GoogleSignin text='Sign up with Google'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
