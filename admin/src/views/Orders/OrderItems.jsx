import React from 'react'
import style from './style.module.scss'
import { Modal, Button, Badge, Table, Accordion } from 'react-bootstrap'
import { API_URL } from '../../constants'

const OrderItems = ({ itemsToggle, setItemsToggle, items }) => {
  return (
    <Modal show={itemsToggle} onHide={() => setItemsToggle(false)}>
      <Modal.Header>
        <div className={style.orders__items_header}>
          <h2>Order Items List</h2>
          <p>
            {' '}
            Order Id: <i> {items._id} </i>{' '}
          </p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={`${style.orders__items_list} font-size-button`}>
          <Accordion>
            {items.data.map((item) => (
              <Accordion.Item key={item._id} eventKey={item._id}>
                <Accordion.Header>{item.product.name}</Accordion.Header>
                <Accordion.Body>
                  <div className={style.orders__items_data}>
                    <div className={style.orders__items_info}>
                      <figure>
                        <img
                          src={`${API_URL}/images/${item.product.images[0]?.src}`}
                          alt={item.product.name}
                        />
                      </figure>
                      <div className={style.orders__items_name}>
                        <h3> {item.product.name} </h3>
                        <span> {item.product.type} </span>
                      </div>
                    </div>
                    <div className={style.orders__items_price}>
                      <p>
                        <span> Quantity </span>
                        <span> {item.quantity} </span>
                      </p>
                      <p> X </p>
                      <p>
                        <span> Price </span>
                        <span> {item.product.price} </span>
                      </p>
                      <p> = </p>
                      <p>
                        <span> Total </span>
                        <span> {item.product.price * item.quantity} </span>
                      </p>
                    </div>
                  </div>

                  <h4>Selected Options</h4>
                  <div className={style.orders__data}>
                    <Table striped hover bordered>
                      <tbody>
                        {item.options.length > 0 ? (
                          item.options.map((option) => (
                            <tr key={option._id}>
                              <td>{option.question}</td>
                              <td>{option.option}</td>
                            </tr>
                          ))
                        ) : (
                          <Badge bg='danger' size='lg'>
                            Not Provided
                          </Badge>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => setItemsToggle(false)}
          variant='danger'
          size='lg'
        >
          {' '}
          Close{' '}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default OrderItems
