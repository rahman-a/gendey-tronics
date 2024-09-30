import React, { useRef, useEffect, useState, useCallback } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import ProductCard from '../../components/ProductCard'
import { useLocation } from 'react-router-dom'
import CardSlider from '../../components/CardSlider'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import product from '../../constants/productConstant'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import strings from '../../localization'
import CardsContainer from '../../components/CardsContainer'
import { API_URL } from '../../constants'
import { Helmet } from 'react-helmet-async'
import { capitalizeSentences } from '../../utils'

const Products = () => {
  // const [imgSrc, setImgSrc] = useState(null)
  // const [textOpacity, setTextOpacity] = useState(0)
  const wrapperRef = useRef(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state) => state.listProducts
  )
  // const { items } = useSelector((state) => state.listNavItems)
  const { lang } = useSelector((state) => state.language)
  const query = new URLSearchParams(location.search)
  const type = query.get('type')
  // const reformType = (type) => {
  //   return type.split('-').join(' ')
  // }

  // const getHeroImageSrc = useCallback(() => {
  //   const itemType = type.split('-').join(' ')
  //   if (items) {
  //     for (const item of items) {
  //       const navItem = item.subItems.find(
  //         (item) => item.title['en'].toLocaleLowerCase() === itemType
  //       )
  //       if (navItem) {
  //         setImgSrc(navItem.image)
  //         setTimeout(() => {
  //           setTextOpacity(1)
  //         }, 500)
  //       }
  //     }
  //   }
  // }, [items, type])

  // useEffect(() => {
  //   getHeroImageSrc()
  //   return () => {
  //     setImgSrc(null)
  //     setTextOpacity(0)
  //   }
  // }, [getHeroImageSrc])

  useEffect(() => {
    type && dispatch(actions.products.listProducts(type))
  }, [type])

  return (
    <Template>
      {type && (
        <Helmet>
          <title>{capitalizeSentences(type)}</title>
          <meta
            name='description'
            content='list different kinds of products related to autotronices field'
          />
        </Helmet>
      )}
      <div
        className={style.products}
        style={{ height: loading ? 'calc(100vh - 55rem)' : 'unset' }}
      >
        {loading ? (
          <Loader size='10' center custom={{ color: '#F8C600', top: '35%' }}>
            <p>{strings.product[lang].products_load}</p>
          </Loader>
        ) : error ? (
          <div style={{ textAlign: 'center' }}>
            <img
              src='/images/no-product.png'
              alt='no product found'
              style={{ maxWidth: '35rem' }}
            />
            <Message
              custom={{ margin: '3rem 0' }}
              type='error'
              size='5'
              message={error}
            />
          </div>
        ) : (
          products && (
            <>
              {/* <figure className={style.products__figure}>
                <div
                  className={style.products__figure_content}
                  style={{ opacity: textOpacity }}
                >
                  <h1>{reformType(type)}</h1>
                  <h2>online file services</h2>
                  <p>think more about tested solution</p>
                </div>
                <img src={`${API_URL}/images/${imgSrc}`} alt='products-files' />
              </figure> */}
              <div className={`container ${style.products__container}`}>
                <div className={style.products__wrapper} ref={wrapperRef}>
                  <CardsContainer>
                    {products.map((product) => (
                      <ProductCard card={product} key={product._id} />
                    ))}
                  </CardsContainer>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </Template>
  )
}

export default Products

/***
 * <CardSlider
                    length={products.length}
                    containerRef={wrapperRef}
                  >
                    {products.map((product) => (
                      <ProductCard card={product} key={product._id} />
                    ))}
                  </CardSlider>
 */
