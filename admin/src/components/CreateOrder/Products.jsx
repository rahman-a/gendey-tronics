import React from 'react'
import {Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
import {Plus, Minus} from '../../icons'
import Options from './Options'

const Products = ({
    product, 
    idx,
    length,
    handleProductInputChange,
    initiateOptions,
    addProduct,
    removeProduct,
    handleProductOptionsInput,
    addProductOption,
    removeProductOption
}) => {
  
    return (
    <div key={product.key}>
        <h5> Product Number {idx + 1} </h5>
        <Row className='mb-3'>
            {/* Product Id */}
            <InputGroup as={Col} style={{flexGrow:'4'}}>
                <InputGroup.Text> product id </InputGroup.Text>
                <Form.Control name='product' onChange={(e) => handleProductInputChange(product.key, e)}/>
            </InputGroup>
            
            {/* Product Quantity */}
            <InputGroup as={Col} style={{flexGrow:'2'}}>
                <InputGroup.Text> quantity </InputGroup.Text>
                <Form.Control name='quantity' type='number' onChange={(e) => handleProductInputChange(product.key, e)}/>
            </InputGroup>
            
            {/* Product Options */}
            <InputGroup as={Col}>
                <Button variant='dark' onClick={() => initiateOptions(product.key)}> set options </Button>
            </InputGroup>

            {/* Add or Remove Product */}
            { idx + 1 === length && 
                <Col className='d-flex'>
                    <InputGroup>
                        <Button variant='light' onClick={addProduct}> 
                                <span> <Plus/> </span> 
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <Button variant='light' onClick={() => removeProduct(product.key)}> 
                            <span> <Minus/> </span> 
                        </Button>
                    </InputGroup>
                </Col>
            } 
        </Row>
    
        {/* Set Products Options */}
        <div className='my-4'>
            {
                product.options.map((option, idx) => (
                    <Options
                    key={option.key}
                    product={product}
                    option={option}
                    idx={idx}
                    handleProductOptionsInput={handleProductOptionsInput}
                    addProductOption={addProductOption}
                    removeProductOption={removeProductOption}
                    />
                ))
            }
        </div>
</div>
  )
}

export default Products