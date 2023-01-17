import React from 'react';
import style from './style.module.scss'
import {Modal, Button, Badge, Table} from 'react-bootstrap'
import {HandDollar} from '../../icons'


const PaymentModal = ({paymentData, togglePayment, setTogglePayment}) => {
  
    const dateOptions = {
        month:'long',
        year:'numeric',
        day:'numeric'
    }
    
  
  return <Modal show={togglePayment} onHide={() => setTogglePayment(false)}>
  <Modal.Header>
       <div style={{display:'flex'}}>
           <span style={{marginRight:'1rem'}}> <HandDollar/> </span>
           <span style={{fontSize:'1.8rem'}}> Payment Info </span>
       </div>
  </Modal.Header>
  <Modal.Body>
      <div className={style.orders__data}>
           <Table striped hover bordered>
               <tbody>
                <tr>
                    <td>Paypal Payment Id</td>
                    <td> {paymentData.id} </td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td> {
                            paymentData.status === "COMPLETED" 
                            ? <Badge bg='success' size='lg'> Completed </Badge>
                            : <Badge bg='danger' size='lg'> Not Completed </Badge>
                        } </td>
                </tr>
                <tr>
                    <td>Update Time</td>
                    <td>
                        {new Date(paymentData.update_time).toLocaleDateString('en-US', dateOptions)} 
                    </td>
                </tr>
               </tbody>
           </Table>
      </div>
  </Modal.Body>
  <Modal.Footer>
       <Button size='lg' variant='danger' onClick={() => setTogglePayment(false)}>
           Close
       </Button>
  </Modal.Footer>
</Modal>
};

export default PaymentModal;
