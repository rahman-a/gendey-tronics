import React, {useState} from 'react'
import style from './style.module.scss'
import Loader from '../Loader'
import Message from '../Message'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from './orderItems'

const OrdersList = ({orders, loading, error, lang, strings}) => {
    const [order, setOrder] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)
    
    const showOrderDetailsHandler = data => {
        setOrder(data)
        setToggleModal(true)
    }
    return (
        <>
        <Modal 
        onShow={toggleModal} 
        onClose={() => setToggleModal(false)}
        order={order}/>
        <div style={{height:loading ? '45rem': '100%',}}
         className={style.orders__list}>
            {
            loading 
            ?<Loader size='20' center/>
            : error ? <div className={style.orders__message}>
                <h2>{error}</h2>
            </div>
            :orders && 
            <Table striped bordered hover>
                <thead style={{textAlign:'center'}}>
                    <tr>
                        <th>#</th>
                        <th>{strings.client[lang].order_no}</th>
                        <th>{strings.client[lang].order_at}</th>
                        <th>{strings.client[lang].payment_method}</th>
                        <th>{strings.client[lang].total}</th>
                        <th>{strings.client[lang].items_show}</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:'center'}}>
                    
                    {
                        orders.map((order, idx) => (
                        <tr key={order._id}>
                            <td>{idx + 1}</td>
                            <td title={order._id}>
                                {order._id.substr(0, 10) + '...'}
                            </td>
                            <td>
                                {new Date(order.paidAt).toLocaleDateString()}
                            </td>
                            <td>
                                {order.paymentMethod}
                            </td>
                            <td>
                                ${order.totalPrice}
                            </td>
                            <td>
                                <Button variant='warning'
                                onClick={() => showOrderDetailsHandler({_id:order._id, items:order.orderItems})}>Details
                                </Button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
          </Table>
            }
        </div>
    </>
    )
}

export default OrdersList
