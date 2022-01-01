import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {v4 as uuidv4} from 'uuid'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import constants from '../../constants'
import strings from '../../localization'

const Options = ({options, setOptions, addToCart, setToggle, lang}) => {
    const [qOrder, setQOrder] = useState(0)
    const [ctaBtn, setBtn] = useState(strings.product[lang].next)
    const dispatch = useDispatch()
    const {loading, message} = useSelector(state => state.newItem)

    const nextQHandler = _ => {
        if(qOrder > options.length - 3) setBtn(strings.product[lang].cart)
        if(qOrder < options.length - 1) {
            setQOrder(prev => prev + 1)
        }else {
            addToCart()
        }
    }

    const getOptionsValuesHandler = (e, question) => {
        const value = {question, [e.target.name]: e.target.value}
        setOptions(prev => [...prev, value])
    }
    useEffect(() => {
        if(message){
            setTimeout(() => {
                dispatch({type:constants.product.ADD_ITEM_TO_CART_RESET})
                setToggle(false)
            },3500)
        }
    }, [message])
    return (
        <div className={style.product__options}>
            {message && 
            <Message type='success' size='2' message={message}/>}
            <h3>{`Q${qOrder + 1}:${options[qOrder].question}`}</h3>
            <div className={style.product__options_choose}>
                {options[qOrder].elements.map((option, idx) => (
                    <div className={style.product__options_group} key={options[qOrder]._id + idx}>
                        <input 
                        type="radio" 
                        name='option' 
                        id={`item_${idx+1}`}
                        value={option}
                        selected={false}
                        onChange={(e) => getOptionsValuesHandler(e, options[qOrder].question)}/> 
                        <label htmlFor={`item_${idx+1}`}>{option}</label>
                    </div>
                ))}
            </div>
            <div className={style.product__options_footer}>
                <div className={style.product__options_indicator}>
                   { [...Array(options.length)].map((_, idx) => {
                       return idx === qOrder 
                       ? <span className={style.product__options_indicator_active} key={uuidv4()}></span>
                       :<span key={uuidv4()}></span>
                   })}
                </div>
                <div className={`${style.product__options_trans} 
                    ${lang === 'ar' ? style.product__options_trans_ar :''}`}>
                    <button onClick={nextQHandler}
                    style={{position:'relative'}}>
                        {loading
                        ? <Loader size='4' center/>
                        :ctaBtn
                        } 
                        <span>&#x0003E;</span> 
                    </button>
                    {/* <button>Finish</button> */}
                </div>
            </div>
        </div>
    )
}

export default Options