import React, {useEffect} from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Badge } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import parser from 'html-react-parser'
import {HeartCrack} from '../icons'
import Loader from '../Loader'
import strings from '../../localization'
import actions from '../../actions'
import constants from '../../constants'

const SearchOutput = ({isSearch, setIsSearch, keyword}) => {
    const {lang} = useSelector(state => state.language)
    const {loading, error, result} = useSelector(state => state.clientSearch)
    const dispatch = useDispatch()
    const navigate = useHistory().push

    const renderContent = (content) => {
        const text = cutText(content, 150)
        return parser(text)
    }
    
    const badgeColor  = {
        blog:'warning',
        product:'success',
        course:'dark'
    }

    const cutText = (text, length) => { 
        return text.length > length ? text.substr(0, length) + '...' : text
    }

    const navigateTo = (type, id) => {
        setIsSearch(false) 
        setTimeout(() => {
            switch(type){
                case 'blog':
                    navigate(`/blog/${id}`)
                    break
                case 'product':
                    navigate(`/product/${id}`)
                    break
                case 'course':
                    navigate(`/course/${id}`)
                    break
                default:
                    break
            }
        }, 500)
    }
    
    useEffect(() => {
        if(isSearch) {
            dispatch(actions.client.clientSearch(keyword))
        }
        if(!isSearch) {
            dispatch({type:constants.client.USER_SEARCH_RESET})
        }
    }, [isSearch])

    useEffect(() => {
        return () => setIsSearch(false)
    },[])
  
 return (
    <Modal show={isSearch} onHide={() => setIsSearch(false)}>
        <Modal.Header>
            <Modal.Title> {strings.general[lang].search_result} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={style.search}>
               {loading &&  <div className={style.search__loading}>
                    <Loader size='5'/>
                </div> }
                {error &&  <div className={style.search__loading}>
                    {error}
                </div> }
               {result && result.length > 0 
                ? <ul className={style.search__list}>
                    {
                        result.map(item => (
                            <li className={style.search__item} onClick={() => navigateTo(item.type, item._id)}>
                                <div className={style.search__item_title}> 
                                <span> {item.title} </span>  
                                    <Badge bg={badgeColor[item.type]}> {item.type} </Badge>
                                </div>
                                <div className={style.search__item_content}>
                                    {renderContent(item.description)}
                                </div>
                            </li>
                        ))
                    }
                </ul> 
                
                :result && <div className={style.search__noResult}>
                    <span className={style.search__noResult_icon}>
                        <HeartCrack />
                    </span>
                    <p className={style.search__noResult_text}>
                        {strings.general[lang].no_result_found_text}
                    </p>
                </div>
                } 
                
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button size='lg' variant="secondary" onClick={() => setIsSearch(false)}> 
                {strings.general[lang].close} 
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default SearchOutput