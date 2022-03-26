import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {Button, Form, InputGroup, Col, Row} from 'react-bootstrap'
import actions from '../../actions'
import {Trash} from '../../icons'
import { Loader } from '../../components'

const DownloadLinks = ({id, name, links}) => {
  const [link, setLink] = useState(null)
  const [part, setPart] = useState(null)
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch()
  const {loading, error, message} = useSelector(state => state.editProduct)

  const addProductLink = _ => {
    dispatch(actions.products.updateProduct(id, {link:{link, part:parseInt(part)}} ))
  }

  const deleteLink = linkId => {
    dispatch(actions.products.deleteLink(id, linkId))
  }

  useEffect(() => {
    error && setErrors(error)
  },[error])
  
  return (
    <div className={style.product__links}>
       <h2> Product Download Links </h2>
       <div className={style.product__links_separator}></div>
       <div style={{marginBottom:'1rem'}}>
        {
          links && links.map(link => (
            <div style={{display:'flex', justifyItems:'space-between', marginTop:'1rem'}}>
              <p style={{marginRight:'auto', color:'#938d8d', fontSize:'1.4rem'}}> 
                {`${name} part-${link.part}`} 
              </p>
                <Button variant='danger' onClick={() => deleteLink(link._id)}> 
                  <span> <Trash/> </span> 
                </Button>
            </div>
          ))
        }
      </div>
      <Row>
        <InputGroup className='mb-3' as={Col} style={{flexGrow:'2'}}>
            <InputGroup.Text> Download Link </InputGroup.Text>
            <Form.Control onChange={({target:{value}}) => setLink(value)}/>
        </InputGroup>
        
        <InputGroup className='mb-3' as={Col}>
            <InputGroup.Text> Part </InputGroup.Text>
            <Form.Control type='number' onChange={({target:{value}}) => setPart(value)}/>
        </InputGroup>
        
        { loading && <Loader size='4' options={{animation:'border'}}/> } 
        
        <Button 
        variant='success' 
        onClick={addProductLink}> 
           Add
        </Button>
       
       { (errors || message) 
       && <p style={{
          textAlign:'center',
           marginTop:'1rem',
           color:errors ? 'red' : 'green'
        }}>
          {errors || message}
        </p> }
      </Row>
    </div>
  )
}

export default DownloadLinks