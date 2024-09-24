import React, { useEffect, useRef } from 'react'
import ProductCard from '../ProductCard'
import style from './style.module.scss'
import CardSlider from '../CardSlider'
import Loader from '../Loader'
import Alert from 'react-bootstrap/Alert'
import CardsContainer from '../CardsContainer'

const ProductSection = ({ data, loading, error }) => {
  const containerRef = useRef(null)
  return (
    <div
      className={style.productSection}
      style={{
        marginBottom: loading ? '10rem' : 'unset',
      }}
    >
      {loading ? (
        <Loader size='20' center custom={{ color: '#d0ae0b' }} />
      ) : error ? (
        <Alert style={{ textAlign: 'center' }} variant='danger'>
          {error}
        </Alert>
      ) : (
        <div
          className='container'
          ref={containerRef}
          style={{ position: 'relative', overflow: 'hidden' }}
          data-aos='fade-left'
        >
          <CardsContainer title={data.title}>
            {data.cards?.map((card) => (
              <ProductCard card={card} key={card._id} />
            ))}
          </CardsContainer>
        </div>
      )}
    </div>
  )
}

export default ProductSection

/**
 * 
 * <CardSlider length={data.cards?.length} containerRef={containerRef} title={data.title}>
                    {
                        data.cards?.map(card => (
                            <ProductCard card={card} key={card._id}/>
                        ))
                    }
                </CardSlider>
 */
