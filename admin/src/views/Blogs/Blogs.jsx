import React, {useState} from 'react'
import style from './style.module.scss'
import {Button} from 'react-bootstrap'
import {Input, Table, Loader, HeaderAlert} from '../../components'



const Blogs = () => {
  const [filter, setFilter] = useState(null)
  
  
    const getProductFilterQuery = e => {
        const value = {[e.target.name]: e.target.value}
        setFilter({...filter, ...value})
    }

    
  const searchProductHandler = _ => {
    // dispatch(actions.products.listAllProducts({...filter, page:10}))
  }
  
    return (
    <div className={style.blogs}>
       <h1>Blogs List</h1>
    
       <div className={style.products__filter}>
            <Input
            type="text" 
            name='title' 
            onChange={(e) => getProductFilterQuery(e)}
            placeholder='search by product name....'
            className={style.products__search}
            />

            <Button 
            variant='warning' 
            size='lg'
            onClick={searchProductHandler}> 
              SEARCH 
            </Button>

        </div>
    
    
    </div>
  )
}

export default Blogs