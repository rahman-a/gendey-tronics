import React, {useState, useEffect} from 'react';
import {Badge} from 'react-bootstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './style.module.scss'
import {Check, Copy, Eye} from '../../icons'
import UserModal from './UserModal';
import PaymentModal from './PaymentModal';
import OrderItems from './OrderItems';

const Row = ({order, idx}) => {
    const [isCopied, setIsCopied] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const [userData, setUserData] = useState(null)
    
    const [togglePayment, setTogglePayment] = useState(false)
    const [paymentData, setPaymentData] = useState(null)

    const [itemsToggle, setItemsToggle] = useState(false)
    const [items, setItems] = useState(null)


    const dateOptions = {
        month:'long',
        year:'numeric',
        day:'numeric'
    }
    
    const copyIdHandler = _ => {
      setIsCopied(true)
      setTimeout(() => {
          setIsCopied(false)
      },500)
  } 

  const showPaymentResult = () => {
      setPaymentData(order.paymentResult)
      setTogglePayment(true)
  }

  const showItemsData = _ => {
    setItems({data:order.orderItems, _id:order._id})  
    setItemsToggle(true)
  }

  const showUserData = _ => {
    order.shippingAddress 
   ? setUserData({...order.user, ...order.shippingAddress})
   : setUserData(order.user)
    setToggleUser(true)
  }
  
  return <>
    
    { userData && <UserModal 
    toggleUser={toggleUser}
    setToggleUser={setToggleUser}
    userData={userData}/> }  

    { paymentData && <PaymentModal 
    togglePayment={togglePayment}
    setTogglePayment={setTogglePayment}
    paymentData={paymentData}/> }  
    
    {
        items && <OrderItems
        items={items}
        itemsToggle={itemsToggle}
        setItemsToggle={setItemsToggle}
        />
    }
    
    {
        <>
            <td>{idx + 1}</td>
            <td className='row-id'>
                <CopyToClipboard text={order._id} onCopy={copyIdHandler}>
                    <span>
                    {isCopied ? <Check/> :<Copy/>} 
                    </span>
                </CopyToClipboard>
                { order._id.substring(0,12) + '...' }
            </td>
            <td>{
                new Date(order.createdAt).toLocaleDateString('en-US', dateOptions)
            }</td>
            <td className={style.orders__name}>
                {
                    <span onClick={showUserData}> 
                        {order.user.firstName + ' ' + order.user.lastName} 
                    </span>  
                }
            </td>
            <td>{
                order.isPaid 
                ?<Badge bg='success'>{new Date(order.paidAt).toLocaleDateString('en-US', dateOptions)}</Badge>
                :<Badge bg='danger'>Not Paid</Badge>
                    
            }</td>
            <td>{
                order.isDelivered 
                ? <Badge bg='success'>{new Date(order.deliveredAt).toLocaleDateString('en-US', dateOptions)}</Badge>
                : <Badge bg='danger'>Not Delivered</Badge>
            }</td>
            <td className={style.orders__name}>
                {
                   <span onClick={showPaymentResult}> {order.paymentMethod}  </span> 
                }
            </td>
            <td>
                {
                    order.totalPrice
                }
            </td>
            <td className={style.orders__show}>
                <span onClick={showItemsData}>
                    <Eye/>
                </span>
            </td>
        </>
    }
  </>
};

export default Row;