import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Register from '../../components/Register'

const Credential = () => {
    return (
        <Template>
            <div className={style.credential}>
                <div className="container">
                    <div className={style.credential__wrapper}>
                        <figure>
                            <img src="images/engine.png" alt="engine" />
                        </figure> 
                        <Register/>
                    </div>
                </div>
            </div>
        </Template>
        
    )
}

export default Credential
