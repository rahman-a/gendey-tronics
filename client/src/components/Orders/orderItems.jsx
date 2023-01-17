import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import {Pointer} from '../icons'

const OrderItems = ({onShow, onClose, order}) => {
    return (
    <>
        {order && <Modal show={onShow} onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
           <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                     Order NO: {order._id}
                </Modal.Title>
           </Modal.Header>
           <Modal.Body>
                <Accordion>
                {
                    order && order.items.map((item, idx) => (
                        <Accordion.Item eventKey={idx} key={item._id}>
                            <Accordion.Header>
                                {item.product.name}  <Pointer style={{width:'1.2rem', marginLeft:'1rem'}}/>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.product.price}</p>
                                <p>options: &#x021A1;</p>
                                {
                                    item.options?.map(option => (
                                        <p key={option._id}
                                        style={{fontWeight:'300', fontSize:'1.4rem'}}>
                                            {option.question} =&gt; {option.option}
                                        </p>
                                    ))
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
                </Accordion>
           </Modal.Body>
           <Modal.Footer>
                <Button size='lg' onClick={onClose}>Close</Button>
            </Modal.Footer>
       </Modal>}
    </>
    )
}

export default OrderItems
