import React, { useEffect, useState, useRef } from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SideAlert, BackButton } from '../../components'
import actions from '../../actions'
import constants from '../../constants'
import ProductData from './NewProductData'
import ProductOptions from './NewProductOptions'

const Product = () => {
  const [info, setInfo] = useState({
    name: '',
    short: '',
    description: '',
    video: '',
    price: '',
    quantity: '',
    images: '',
    type: '',
  })
  const [options, setOptions] = useState([])
  const imageRef = useRef()
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector(
    (state) => state.createProduct
  )

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  const saveProductInfo = (product) => {
    const data = new FormData()

    for (let key in product) {
      if (product[key]) {
        if (key === 'images') {
          for (const image of product['images']) {
            data.append('images', image)
          }
        } else data.append(key, product[key])
      }
    }
    data.append('options', JSON.stringify(options))
    console.log({ product })
    dispatch(actions.products.createNewProduct(data))
  }

  useEffect(() => {
    if (message) {
      setOptions([])
      setInfo({
        name: '',
        short: '',
        description: '',
        video: '',
        price: '',
        quantity: '',
        images: '',
        type: '',
      })

      imageRef.current.value = null
    }
  }, [message])

  useEffect(() => {
    dispatch(actions.menu.listPages())
    return () => {
      dispatch({ type: constants.products.CREATE_PRODUCT_RESET })
    }
  }, [dispatch])

  return (
    <div className={`${style.product} font-size-input`}>
      <BackButton page='products' title='products' />

      <SideAlert
        position='left'
        type='danger'
        isOn={error ? true : false}
        text={error}
      />

      <SideAlert
        position='left'
        type='success'
        isOn={message ? true : false}
        text={message}
      />

      <div className='container'>
        <div className={style.product__wrapper}>
          <div className={style.product__header}>
            <h1 className='main-header'> Create New Product... </h1>
            <span className={style.product__header_date}>
              created At: {new Date().toLocaleDateString('en-US', dateOptions)}
            </span>
          </div>

          <div className={style.product__body}>
            <ProductData
              info={info}
              setInfo={setInfo}
              saveProductInfo={saveProductInfo}
              imageRef={imageRef}
              loading={loading}
            />

            <ProductOptions options={options} setOptions={setOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
