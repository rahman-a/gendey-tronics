import React from 'react'
import {Spinner} from 'react-bootstrap'

const loader = ({children, size, center, custom}) => {
    const getStyle = _ => {
        let centerStyle = {}
        if(center) {
            centerStyle = {
                position:'absolute',
                left:'50%',
                top:'50%',
                transform:'translate(-50%, -50%)'
            }
        }
        if(custom) {
            centerStyle = {...centerStyle, ...custom}
        }
        return {
            textAlign:'center',
            padding:'1rem',
            width:size ? `${size}rem` :'3rem',
            height:size ?`${size}rem` : '3rem',
            ...centerStyle
        }
    }
    return (
        <div style={getStyle()}>
           <Spinner animation="border"/>
           {children}
        </div>
    )
}

export default loader