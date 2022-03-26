import React from 'react'
import {Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
import {Plus, Minus} from '../../icons'

const Options = ({
    product,
    option,
    idx,
    handleProductOptionsInput,
    addProductOption,
    removeProductOption
}) => {
  return (
    <Col className='d-flex px-5 mb-3' key={option.key}>
        
        {/* Option Question */}
        <InputGroup as={Col} style={{marginRight:'1rem', flexGrow:'4'}}>
            <InputGroup.Text> option </InputGroup.Text>
            <Form.Control 
            name='question' 
            onChange={(e) => handleProductOptionsInput(product.key, option.key, e)}/>
        </InputGroup>
        
        {/* Name of Selected Option */}
        <InputGroup as={Col} style={{flexGrow:'4'}}>
            <InputGroup.Text> selected </InputGroup.Text>
            <Form.Control 
            name='option' 
            onChange={(e) => handleProductOptionsInput(product.key, option.key, e)}/>
        </InputGroup>
        
        {/* Add or Remove Product */}
        { idx + 1 === product.options.length 
        && <Col className='d-flex'>
                <InputGroup>
                    <Button variant='light' onClick={() => addProductOption(product.key)}> 
                        <span> <Plus/> </span> 
                    </Button>
                </InputGroup>
                <InputGroup>
                    <Button variant='light' onClick={() => removeProductOption(product.key, option.key)}> 
                        <span> <Minus/> </span> 
                    </Button>
                </InputGroup>
            </Col> 
        }
    </Col>
  )
}

export default Options