import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import actions from '../../actions'
import style from './style.module.scss'
import { ArrowRight } from '../icons'
import strings from '../../localization'

const Slider = () => {
  const { sliders } = useSelector((state) => state.pageSliders)
  const dispatch = useDispatch()
  const navigate = useHistory().push
  const { lang } = useSelector((state) => state.language)

  useEffect(() => {
    sliders?.length && console.log({ sliders })
  }, [sliders])

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
      // autoPlay
      infiniteLoop={true}
      swipeable={true}
      emulateTouch={true}
      className={style.carousel}
    >
      {sliders ? (
        sliders.map((slide) => (
          <div
            style={{ cursor: 'pointer', height: '100%' }}
            key={slide._id}
            onClick={() =>
              navigateTo(slide.target.type, slide.target.itemId._id)
            }
          >
            <img alt={slide.header[lang]} src={`/api/images/${slide.image}`} />
            <div
              className={`${style.carousel__desc} ${
                lang === 'ar' ? style.carousel__desc_ar : ''
              }`}
            >
              <h2 className={style.carousel__header}>
                {slide.header[lang].toLocaleUpperCase()}
              </h2>
              <div className={style.carousel__info}>
                <h3 className={style.carousel__subheader}>
                  {slide.subHeader[lang].toLocaleUpperCase()}
                </h3>
                <button
                  className={style.carousel__more}
                  onClick={() =>
                    navigateTo(slide.target.type, slide.target.itemId)
                  }
                >
                  {strings.general[lang].show_more} <ArrowRight />
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
