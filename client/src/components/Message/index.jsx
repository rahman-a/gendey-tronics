import React from 'react'

const Message = ({message, type, size, width, center, custom}) => {
    const getStyle = () => {
        let font = "5rem";
        let centerStyle = {}
        if((window.matchMedia('(max-width:61.99em)')).matches) {
            font = '3rem'
        }
        if(center) {
            centerStyle = {
                position:'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)'
            }   
        }
        return {
            fontSize:size ? `${size}rem` : font,
            color:type === 'error' ? '#842029' : type === 'success' && '#0f5132',
            textAlign:'center',
            width:width ? width : '100%',
            fontWeight:'200',
            ...centerStyle,
            ...custom
        }

    }
    return (
        <h2 style={getStyle()}>{message}</h2>
    )
}

export default Message
