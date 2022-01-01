import React from 'react'
import FacebookLoginButton from 'react-facebook-login'
import style from './style.module.scss'
import {useDispatch} from 'react-redux'
import actions from '../../actions'

const FacebookSignIn = ({text}) => {
    const dispatch = useDispatch()
    const responseFacebook = (response) => {
        dispatch(actions.client.facebookSignIn({token:response.accessToken}))
    }
    return (
        <div className={style.fb}>
            <FacebookLoginButton
                appId="1150435905491331"
                callback={responseFacebook}
                cssClass={style.fb__button}
                textButton={text}
                icon="fa-facebook"
            />    
        </div>
    )
}

export default FacebookSignIn
