import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Login from '../../components/Login'
import { Helmet } from 'react-helmet-async'

const Credential = () => {
  return (
    <Template>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='login to your account' />
      </Helmet>
      <div className={style.credential}>
        <div className='container'>
          <div className={style.credential__wrapper}>
            <figure>
              <img src='images/engine.png' alt='engine' />
            </figure>
            <Login />
          </div>
        </div>
      </div>
    </Template>
  )
}

export default Credential
