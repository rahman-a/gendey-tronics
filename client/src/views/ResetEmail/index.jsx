import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import strings from '../../localization'

const ResetEmail = () => {
    const [resetPassword, setResetPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const {loading, error, success} = useSelector(state => state.resetPass)
    const {lang} = useSelector(state => state.language)
    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const token = params.get('TOKEN')
    
    const clearAlert = () => {
        dispatch({type: constants.client.RESET_PASSWORD_RESET})
    }

    const submitFormData = e => {
        e.preventDefault()
        if(!token) {
            setErrorMessage(strings.client[lang].invalid_token)
            return
        }
        if(resetPassword !== confirmPassword) {
            setErrorMessage(strings.client[lang].not_match_pass)
            return
        }
        dispatch(actions.client.resetPass({type:'reset', token, password:resetPassword}))
    }
   
    return (
        <Template>
            <div className={style.reset}>
                <div className="container">
                <div style={{maxWidth:'50rem', margin:'0 auto'}}>
                    {
                        loading 
                        ? <Loader size='5' center custom={{color:'#fff', marginTop:'5rem'}}/>
                        : errorMessage 
                        ? <Alert variant='danger' style={{textAlign:'center'}} dismissible onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
                        : error 
                        ? <Alert variant='danger' style={{textAlign:'center'}} dismissible onClose={clearAlert}>{error}</Alert>
                        : success 
                        && <Alert variant='success' style={{textAlign:'center'}}>{strings.client[lang].reset_pass_done}</Alert> 
                    }
                </div>
                
                <div style={{textAlign:'center'}}>
                    <Form onSubmit={submitFormData} 
                    style={{
                        maxWidth:'50rem', 
                        margin:'2rem auto', 
                        textAlign: lang === 'ar' ? 'right' :'left'
                    }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>{strings.client[lang].pass_enter}</Form.Label>
                            <Form.Control
                            onChange={(e) => setResetPassword(e.target.value)}
                            size='lg' 
                            type="password" 
                            placeholder={strings.client[lang].pass_enter} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>{strings.client[lang].pass_enter_again}</Form.Label>
                            <Form.Control
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            size='lg' 
                            type="password" 
                            placeholder={strings.client[lang].pass_enter_again} />
                        </Form.Group>
                        <Button disabled={loading ? true : false} 
                        variant="light" 
                        type="submit" 
                        size='lg'>
                            {strings.client[lang].submit}
                        </Button>
                    </Form>
                </div>       
                </div>
            </div>
        </Template>
    )
}

export default ResetEmail
