import React from 'react';
import style from './style.module.scss'
import {Modal, Table, Button, Badge} from 'react-bootstrap'
import {User} from '../../icons'

const UserModal = ({userData, toggleUser, setToggleUser}) => {
  return<Modal show={toggleUser} onHide={() => setToggleUser(false)}>
  <Modal.Header>
       <div style={{display:'flex'}}>
           <span style={{marginRight:'1rem'}}> <User/> </span>
           <span style={{fontSize:'1.8rem'}}> User Data </span>
       </div>
  </Modal.Header>
  <Modal.Body>
      <div className={style.orders__data}>
           <Table striped hover bordered>
              <tbody>
                <tr>
                    <td>First Name</td>
                    <td> {userData.firstName} </td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td> {userData.lastName} </td>
                </tr>
                <tr>
                    <td>E-mail Address</td>
                    <td>
                        <a href={`mailto:${userData.email}`}> {userData.email} </a>  
                    </td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td> {userData.phoneNumber} </td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>
                        {
                            userData.address 
                            ? `${userData.address}, ${userData.city}, ${userData.country}, ${userData.postalCode}`
                            : <Badge bg='danger' size='lg'> Not Provided </Badge>
                        }
                    </td>
                </tr>
              </tbody>
           </Table>
      </div>
  </Modal.Body>
  <Modal.Footer>
       <Button size='lg' variant='danger' onClick={() => setToggleUser(false)}>
           Close
       </Button>
  </Modal.Footer>
</Modal>
};

export default UserModal;
