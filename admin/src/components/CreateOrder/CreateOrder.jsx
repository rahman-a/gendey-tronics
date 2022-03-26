import React, {useEffect, useState} from 'react'
import style from './style.module.scss'
import {v4 as uuidv4} from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import {Modal, Button, Form, InputGroup} from 'react-bootstrap'
import {CashRegister} from '../../icons'
import {SideAlert, Loader} from '../../components'
import constants from '../../constants'
import actions from '../../actions'
import Products from './Products'

const CreateOrder = ({isOrder, setIsOrder}) => {
    const [errors, setErrors] = useState(null)
    const [data, setData] = useState({
        user:'',
        paymentMethod:'',
        totalPrice:'',
        paidAt:'',
        isPaid:true,
        deliveredAt:'',
        isDelivered:true
    })
    const [products, setProducts] = useState([{
      key:uuidv4(),
      product:'',
      quantity:0,
      options:[]
    }]) 

    const dispatch = useDispatch()
    const {loading, error, message} = useSelector(state => state.createOrder)
    
    const handleInputChange = e => {
        const {name, value} = e.target 
        setData({...data, [name]:value})
    }

  const handleProductInputChange = (key, e) => {
    const copiedProducts = [...products] 
    copiedProducts.forEach(product => {
        if(product.key === key) {
            product[e.target.name] = e.target.value
        }
    })

    setProducts(copiedProducts)
  }
  
  const addProduct = _ => {
      setProducts([
          ...products,
          {
            key:uuidv4(),
            product:'',
            quantity:0,
            options:[]
        }
      ])
  }

  const removeProduct = key => {
      if(products.length > 1) {
          const updatedProducts = products.filter(product => product.key !== key)
          setProducts(updatedProducts)
      }
  }


  const initiateOptions = key => {
    const copiedProducts = [...products] 
    copiedProducts.forEach(product => {
        if(product.key === key) {
            if(product.options.length === 0) {
                product.options = [{
                    key:uuidv4(),
                   question:'',
                   option:''   
                }]
            }
        }
    })

    setProducts(copiedProducts)
  }

  const addProductOption = key => {
    const copiedProducts = [...products] 
    copiedProducts.forEach(product => {
        if(product.key === key) {
            product.options = [...product.options, {
                key:uuidv4(),
               question:'',
               option:''
                
            }]
        }
    })

    setProducts(copiedProducts)
  }

  const removeProductOption = (key, id) => {
    const copiedProducts = [...products] 
    copiedProducts.forEach(product => {
        if(product.key === key) {
            product.options = product.options.filter(option => option.key !== id)
        }
    })

    setProducts(copiedProducts)
  }
  
  const handleProductOptionsInput = (productKey, optionKey, e) => {
    const copiedProducts = [...products] 
    copiedProducts.forEach(product => {
        if(product.key === productKey) {
            product.options.forEach(option => {
                if(option.key === optionKey) {
                    option[e.target.name] = e.target.value
                }
            })
        }
    })
    setProducts(copiedProducts)
  }

  const clearAlert = _ => {
      setErrors(null)
      dispatch({type:constants.products.CREATE_ORDER_RESET})
  }

  const isFormValid = data => {
      if(!data.user) {
          setErrors('User id  is Required!!')
          return false
      }
      for(const product of data.orderItems) {
          if(!product.product) {
            setErrors('Product id is Required!!')
            return false
          }
          if(!product.quantity) {
            setErrors('Product Quantity is Required!!')
            return false
          }
      }
      if(!data.totalPrice) {
        setErrors('Order Total Price  is Required!!')
        return false
      }
      if(!data.paymentMethod) {
        setErrors('Order Payment Method is Required!!')
        return false
      }
      if(!data.paidAt) {
        setErrors('Order Payment Date is Required!!')
        return false
      }

      return true
  }

  const submitOrder = _  => {
     
    const orderItems = [...products] 

    orderItems.forEach(product => {
        delete product.key 
        product.quantity = Number(product.quantity) 
        product.options.forEach(option => {
            delete option.key
        })
    })
    
    const orderData = {
         ...data,
         orderItems,
         deliveredAt:data['paidAt']
     }

     if(isFormValid(orderData)) {
         dispatch(actions.products.createOrder(orderData))
     }
  }

  useEffect(() => {
    error && setErrors(error)
  },[error])

  return (
    <>
        <SideAlert
        text={errors}
        isOn={errors ? true : false}
        type='danger'
        reset={() => clearAlert()}
        />

        <SideAlert
        text={message}
        isOn={message ? true : false}
        type='success'
        reset={() => clearAlert()}
        />
        <Modal show={isOrder} onHide={() => setIsOrder(false)}>
            <Modal.Header>
                <p>
                    <span> <CashRegister/> </span>
                    <span style={{marginLeft:'1rem'}}> Create Order </span>
                </p>
        
            </Modal.Header>
            <Modal.Body>
                <div className={style.order}>
                    {loading && <div className={style.order__overlay}>
                        <Loader size='5' center options={{animation:'border'}}/>
                    </div> }
                    <Form>
                        {/* User Id */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text> user id </InputGroup.Text>
                            <Form.Control name='user' onChange={(e) => handleInputChange(e)}/>
                        </InputGroup>
                        
                        {
                            products.map((product, idx) => (
                                <Products
                                key={product.key}
                                product={product}
                                idx={idx}
                                length={products.length}
                                handleProductInputChange={handleProductInputChange}
                                addProduct={addProduct}
                                removeProduct={removeProduct}
                                initiateOptions={initiateOptions}
                                addProductOption={addProductOption}
                                removeProductOption={removeProductOption}
                                handleProductOptionsInput={handleProductOptionsInput}
                                />
                            ))
                        }
                        
                        {/* Total Price */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text> total price </InputGroup.Text>
                            <Form.Control type='number' name='totalPrice' onChange={(e) => handleInputChange(e)}/>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup>
                        
                        {/* Payment Method */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text> payment method </InputGroup.Text>
                            <Form.Control name='paymentMethod' onChange={(e) => handleInputChange(e)} placeholder='ex: paypal, fawery or vodafone cash'/>
                        </InputGroup>
                        
                        {/* Payment Date */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text> paid at </InputGroup.Text>
                            <Form.Control name='paidAt' onChange={(e) => handleInputChange(e)} type='date'/>
                        </InputGroup>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={submitOrder}> Create Order </Button>
                <Button variant='danger' onClick={() => setIsOrder(false)}> Cancel </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default CreateOrder