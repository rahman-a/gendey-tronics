import React, {useState, useEffect, useRef} from 'react';
import style from './style.module.scss'
import {Button, Popover, Overlay} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Input,Loader, HeaderAlert, Pagination} from '../../components'
import actions from '../../actions';
import Row from './Row';

const Orders = () => {
  const [skipValue, setSkipValue] = useState(0)
  const [popover, setPopover] = useState(false) 
  const [popoverTarget, setPopoverTarget] = useState(null)
  const [filter, setFilter] = useState({
    _id:'',
    firstName:'',
    createdAt:'',
    totalPrice:''
  })
  const popoverRef = useRef(null)
  const dispatch = useDispatch()
  const {loading, error, orders, count} = useSelector(state => state.listAllOrders)

  const showPopoverToggle = (event) => {
    setPopover(!popover);
    setPopoverTarget(event.target);
  };

  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    dispatch(actions.products.listAllOrders(skip))
  }

  const popoverContent = (
    <Popover id="popover-basic">
      <Popover.Body>
       <span style={{fontSize:'1.2rem'}}> search by typing price range eg (100-200) </span> 
      </Popover.Body>
    </Popover>
  );

  const searchProductHandler = e => {
      const value  = {[e.target.name]: e.target.value}
      setFilter({...filter, ...value})
  }

  const initiateOrderFiltration = _ => {
    dispatch(actions.products.listAllOrders(filter))
    setFilter({
      _id:'',
      firstName:'',
      createdAt:'',
      totalPrice:''
    })
  }

  useEffect(() => {
    dispatch(actions.products.listAllOrders())
  },[])

  return <div className={style.orders}>
        
        <h1 className='main-header'>Orders List</h1>

        <div className={style.orders__search}>
          <Input
          type="text" 
          name='_id'
          value={filter._id}
          onChange={(e) => searchProductHandler(e)}
          placeholder='search by order id....'
          className={style.orders__search_input}
          />

          <Input
          type="text" 
          name='firstName' 
          placeholder='search by user name....'
          onChange={(e) => searchProductHandler(e)}
          className={style.orders__search_input}
          />
        
        <Input
          type="date" 
          name='createdAt' 
          placeholder='search by order date....'
          onChange={(e) => searchProductHandler(e)}
          className={style.orders__search_input}
          />
        
        
        <div ref={popoverRef}>
              <Input
                type="text" 
                name='totalPrice' 
                placeholder='search by order total price....'
                onChange={(e) => searchProductHandler(e)}
                options={{
                  autoComplete:'off',
                  onFocus:showPopoverToggle
                }}
                
                className={style.orders__search_input}
              />
               <Overlay
               show={popover}
               target={popoverTarget}
               placement="top"
               container={popoverRef}
               containerPadding={20}>
                  {popoverContent}
              </Overlay>
        </div>
       

          <Button variant='warning' size='lg' onClick={initiateOrderFiltration}> 
            Search 
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
              <th>Ordered At</th>
              {/* show user information beside shipping Address */}
              <th>Ordered By</th> 
              <th>Paid At</th>
              <th>Delivered At</th>
              {/* show payment Result */}
              <th>Payment Method</th> 
              <th>Total Price</th>
              {/* show order items */}
              <th>Order Items</th> 
            </tr>
          </thead>
          <tbody>
            {
              orders && orders.map((order, idx) => (
                <tr key={order._id}>
                  <Row 
                  order={order} 
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

export default Orders;

