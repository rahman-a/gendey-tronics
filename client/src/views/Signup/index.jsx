import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Register from '../../components/Register'
import { Helmet } from 'react-helmet-async'

const Credential = () => {
  return (
    <Template>
      <Helmet>
        <title>Sign up</title>
        <meta
          name='description'
          content='create a new account and start a great journey with us'
        />
      </Helmet>
      <div className={style.credential}>
        <div className='container'>
          <div className={style.credential__wrapper}>
            <figure>
              <img src='images/engine.png' alt='engine' />
            </figure>
            <Register />
          </div>
        </div>
      </div>
    </Template>
  )
}

export default Credential
