import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, HeaderAlert, Table, SideAlert } from '../../components'
import actions from '../../actions'
import Row from './Row'
import CreateItem from './CreateItem'

const Menu = () => {
  const [isCreateItem, setIsCreateItem] = useState(false)
  const dispatch = useDispatch()
  const { items, isLoading, error } = useSelector((state) => state.listAllItems)
  const { error: delete_error } = useSelector((state) => state.deleteItem)

  useEffect(() => {
    dispatch(actions.menu.listItems())
  }, [])

  return (
    <div className={style.menu}>
      <SideAlert
        type='danger'
        text={delete_error}
        isOn={delete_error ? true : false}
      />

      <CreateItem
        isCreateItem={isCreateItem}
        setIsCreateItem={setIsCreateItem}
      />

      <h1 className='main-header'>Menu</h1>
      <Button
        variant='warning'
        size='lg'
        className={style.menu__add}
        onClick={() => setIsCreateItem(true)}
      >
        Create Item
      </Button>
      {isLoading ? (
        <Loader size='8' options={{ animation: 'border' }} />
      ) : error ? (
        <HeaderAlert type='danger' size='3' text={error} />
      ) : (
        <>
          <Table className={style.menu__table}>
            <thead>
              <th>Order</th>
              <th>Id</th>
              <th>English Title</th>
              <th>Arabic Title</th>
              <th>Created At</th>
              <th></th>
            </thead>
            <tbody>
              {items &&
                items
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <>
                      <tr key={item._id}>
                        <Row item={item} />
                      </tr>
                      {item.subItems && (
                        <div className={style.menu__subItems}>
                          {item.subItems
                            .sort((a, b) => a.order - b.order)
                            .map((subItem) => (
                              <tr
                                key={subItem._id}
                                className={style.menu__subItems_items}
                              >
                                <Row item={subItem} parent={item._id} />
                              </tr>
                            ))}
                        </div>
                      )}
                    </>
                  ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default Menu
