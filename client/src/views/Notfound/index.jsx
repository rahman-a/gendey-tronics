import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button  from 'react-bootstrap/Button'
import strings from '../../localization'

const NotFound = () => {
    const {lang} = useSelector(state => state.language)
    const history = useHistory()

    return (
        <Template>
        <div className={style.notFound}>
            <div className="container">
                <div style={{textAlign:'center'}}>
                    <h1>404</h1>
                    <h2>{strings.general[lang].not_found_page}</h2>
                    <p>{strings.general[lang].not_found_text}</p>
                    <Button 
                    variant='warning'
                    onClick={() => history.push('/')}>
                        {strings.general[lang].not_found_action}
                    </Button>
                </div>             
            </div>
        </div>
    </Template>
    )
}

export default NotFound
