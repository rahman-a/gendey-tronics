import React, {useState, useEffect} from 'react';
import style from './style.module.scss'
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Input, SideAlert, Loader, HeaderAlert, Pagination} from '../../components'
import {} from '../../icons'
import actions from '../../actions';
import constants from '../../constants';
import Row from './Row';
 
const Products = () => {
  const [filter, setFilter] = useState(null)
  const [skipValue, setSkipValue] = useState(0)
  const dispatch = useDispatch()
  const {loading, error, products, count} = useSelector(state => state.listAllProducts)
  const {message, error:delete_error} = useSelector(state => state.deleteProduct)
  
  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    const query = {...filter, ...skip, page:10}  
    dispatch(actions.products.listAllProducts(query))
  }

  const getProductFilterQuery = e => {
    const value = {[e.target.name]: e.target.value}
    setFilter({...filter, ...value})
  }

  const searchProductHandler = _ => {
    dispatch(actions.products.listAllProducts({...filter, page:10}))

  }

  useEffect(() => {
    return () => dispatch({type: constants.products.DELETE_PRODUCT_RESET})
  },[])

  
  useEffect(() => {
    dispatch(actions.products.listAllProducts({page:10}))
  },[message])

  return <div className={style.products}>
      <SideAlert 
        type='danger' 
        text={delete_error}
        isOn={delete_error ? true : false}/>

       <SideAlert 
        type='success' 
        text={message}
        isOn={message ? true : false}/>
        
        <h1>Products List</h1>

        <div className={style.products__filter}>
            <Input
            type="text" 
            name='name' 
            onChange={(e) => getProductFilterQuery(e)}
            placeholder='search by product name....'
            className={style.products__search}
            />

            <Input
            type="text" 
            name='type' 
            onChange={(e) => getProductFilterQuery(e)}
            placeholder='search by product type....'
            className={style.products__search}
            />

            <Input
            type="text" 
            name='price' 
            onChange={(e) => getProductFilterQuery(e)}
            placeholder='search by product price....'
            className={style.products__search}
            />

            <Input
            type="text" 
            name='quantity' 
            onChange={(e) => getProductFilterQuery(e)}
            placeholder='search by product quantity....'
            className={style.products__search}
            />

            <Button 
            variant='warning' 
            size='lg'
            onClick={searchProductHandler}> 
              SEARCH 
            </Button>

        </div>

       { loading
       ? <Loader size='10' options={{animation:'border'}}/>
       : error 
       ? <HeaderAlert type='danger' size='3' text={error}/>
       :<>
       <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products && products.map((product, idx) => (
                <tr key={product._id}>
                  <Row 
                  product={product} 
                  idx={idx + skipValue}/>
                </tr>
              ))
            }
          </tbody>
        </Table>
          {
            count > 10 &&
            <Pagination
            count={Math.ceil(count / 10)}
            moveToPageHandler={(skip) => fetchNextRowsHandler(skip)}/>
          } 
        </>
        }
  </div>;
};

export default Products;
