import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import actions from '../../actions'
import style from './style.module.scss'
import { ArrowRight } from '../icons'

const Slider = () => {
  const { sliders } = useSelector((state) => state.pageSliders)
  const dispatch = useDispatch()
  const navigate = useHistory().push
  useEffect(() => {
    dispatch(actions.client.pageSliders())
  }, [])

  const navigateTo = (type, id) => {
    switch (type) {
      case 'blog':
        navigate(`/blog/${id}`)
        break
      case 'product':
        navigate(`/product/${id}`)
        break
      case 'course':
        navigate(`/course/${id}`)
        break
      default:
        break
    }
  }
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop={true}
      swipeable={true}
      emulateTouch={true}
      className={style.carousel}
    >
      {sliders ? (
        sliders.map((slide) => (
          <div
            style={{ cursor: 'pointer' }}
            key={uuidv4()}
            onClick={() =>
              navigateTo(slide.target.type, slide.target.itemId._id)
            }
          >
            <img alt='' src={`/api/images/${slide.image}`} />
            <div className={style.carousel__desc}>
              <h2 className={style.carousel__header}>
                {slide.header.toLocaleUpperCase()}
              </h2>
              <div className={style.carousel__info}>
                <h3 className={style.carousel__subheader}>
                  {slide.subHeader.toLocaleUpperCase()}
                </h3>
                <button
                  className={style.carousel__more}
                  onClick={() =>
                    navigateTo(slide.target.type, slide.target.itemId)
                  }
                >
                  show more <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={style.carousel__placeholder}> </div>
      )}
    </Carousel>
  )
}

export default Slider
