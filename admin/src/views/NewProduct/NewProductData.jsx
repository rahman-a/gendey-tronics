import React, {useState} from 'react'
import style from './style.module.scss'
import {Form, Button, Alert} from 'react-bootstrap'
import {Loader} from '../../components'

const ProductData = ({saveProductInfo, loading, info, setInfo, imageRef}) => {
  

    const [errors, setErrors] = useState(null)

    const getProductInfo = e => {
        const value = {[e.target.name]:e.target.value} 
        setInfo({...info, ...value})
    }

    const isFormValid = _ => {
        const values = [] 
        for(let key in info) {
            if(info[key]) {
                values.push(info[key])
            }
        }
        if(!values.length) {
            setErrors('Please Provide The Required Data...')
            return false
        }
        if(!info.name) {
            setErrors('Please Provide Product Name...')
            return false
        }
        if(!info.short) {
            setErrors('Please Provide Short Description...')
            return false
        }

        if(!info.description) {
            setErrors('Please Provide Product Description...')
            return false
        }
        if(!info.type) {
            setErrors('Please Provide Product Type...')
            return false
        }
        if(!info.price) {
            setErrors('Please Provide Product Price...')
            return false
        }
        if(!info.quantity) {
            setErrors('Please Provide Product Quantity...')
            return false
        }
        if(!info.image) {
            setErrors('Please Upload Product Image...')
            return false
        }

        return true
    }
    
    const saveTheProductInfo = e => {
        e.preventDefault()
        
        if(isFormValid()) {

            let productData = {}
            
            for (let key in info) {
                if(info[key]) {
                    productData[key] = info[key]
                }
            }
            
            saveProductInfo(productData)
        }
    }

    return (
    <>
        <div className={style.product__form}>
        
        {
            errors && 
            <Alert 
            variant='danger' 
            className='text-center'> 
                {errors}
                <Button variant='outline-danger' onClick={() => setErrors(null)}>
                    Close
                </Button>               
            </Alert>
        } 

            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Product Name 
                        <sup style={{color:'red'}} title='required'>*</sup> 
                    </Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder='Add Product Name'
                    name='name' 
                    value={info.name}
                    onChange={(e) => getProductInfo(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicShort">
                    <Form.Label>Short Description 
                        <sup style={{color:'red'}} title='required'>*</sup> 
                    </Form.Label>
                    <Form.Control 
                    type="text" 
                    name='short'
                    value={info.short}
                    placeholder='Add Short Product Description'
                    onChange={(e) => getProductInfo(e)}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Product Description 
                        <sup style={{color:'red'}} title='required'>*</sup> 
                    </Form.Label>
                    <Form.Control 
                    as='textarea'
                    name='description' 
                    placeholder='Add Long Product Description'
                    value={info.description}
                    onChange={(e) => getProductInfo(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicQuantity">
                    <Form.Label>Product Type
                        <sup style={{color:'red'}} title='required'>*</sup> 
                    </Form.Label>
                    <Form.Select 
                    name="type" 
                    id="type"
                    value={info.type}
                    onChange={(e) => getProductInfo(e)}>
                        <option value="" selected>........</option>
                        <option value="immo off files">Immo off Files</option>
                        <option value="air bag clear crash">Air Bag Clear crash</option>
                        <option value="hardware tools">Hardware Tools</option>
                        <option value="tunning files">Tunning Files</option>
                        <option value="ecu programming">ECU Programming</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicVideo">
                    <Form.Label>Product Video</Form.Label>
                    <Form.Control 
                    type="text"
                    name='video' 
                    placeholder='Add Product Video Link'
                    value={info.video}
                    onChange={(e) => getProductInfo(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Product Price 
                        <sup style={{color:'red'}} title='required'>*</sup> 
                    </Form.Label>
                    <Form.Control 
                    type="number"
                    name='price' 
                    placeholder='Add Product Price'
                    value={info.price}
                    onChange={(e) => getProductInfo(e)}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                    <Form.Label>Product Quantity 
                        <sup style={{color:'red'}} title='required'>*</sup> 
                    </Form.Label>
                    <Form.Control
                    type="number" 
                    name='quantity'
                    placeholder='Add Product Quantity'
                    value={info.quantity}
                    onChange={(e) => getProductInfo(e)}/>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>upload the Product Image 
                        <sup style={{color:'red'}} title='required'>*</sup>
                    </Form.Label>
                    <Form.Control
                    ref={imageRef}
                    type="file"  
                    size='lg'
                    onChange={(e) => setInfo({...info, image:e.target.files[0]})}/>
                </Form.Group>

                <div className={style.product__submit}>
                    <Button  
                        variant="primary" 
                        type="submit"
                        size='lg' 
                        disabled={loading ? true : false}
                        onClick={saveTheProductInfo}>
                            Save
                    </Button>
                  {loading && <Loader size='4' options={{animation:'border'}}/> }
                </div>
                
            </Form> 
        </div>
    </>
)}

export default ProductData