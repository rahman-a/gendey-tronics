import React, {useState} from 'react'
import style from './style.module.scss'

const Options = ({options}) => {
    const [qOrder, setQOrder] = useState(0)
    const [ctaBtn, setBtn] = useState('Next')
    const [optionsValues, setOptionsValues] = useState({})
    
    const nextQHandler = _ => {
        if(qOrder > options.length - 3) setBtn('Add to Cart')
        if(qOrder < options.length - 1) {
            setQOrder(prev => prev + 1)
        }else {
            console.log(optionsValues);
        }
    }

    const getOptionsValuesHandler = e => {
        const value = {[e.target.name]: e.target.value}
        setOptionsValues({...optionsValues, ...value})
    }
    return (
        <div className={style.product__options}>
            <h3>{`Q${qOrder + 1}:${options[qOrder].question}`}</h3>
            <div className={style.product__options_choose}>
                {options[qOrder].options.map((option, idx) => (
                    <div className={style.product__options_group} key={idx}>
                        <input 
                        type="radio" 
                        name={`option_${qOrder + 1}`} 
                        id={`item_${idx+1}`}
                        value={option}
                        onChange={(e) => getOptionsValuesHandler(e)}/> 
                        <label htmlFor={`item_${idx+1}`}>{option}</label>
                    </div>
                ))}
            </div>
            <div className={style.product__options_footer}>
                <div className={style.product__options_indicator}>
                   { [...Array(options.length)].map((_, idx) => {
                       return idx === qOrder 
                       ? <span className={style.product__options_indicator_active}></span>
                       :<span></span>
                   })}
                </div>
                <div className={style.product__options_trans}>
                    <button onClick={nextQHandler}>
                        {ctaBtn} 
                        <span>&#x0003E;</span> 
                    </button>
                    {/* <button>Finish</button> */}
                </div>
            </div>
        </div>
    )
}

export default Options