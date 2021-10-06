import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Template = ({children, elementRefs}) => {
    return (
        <>
         <Header elementRefs={elementRefs}/>
            {children}
         <Footer/>   
        </>
    )
}

export default Template
