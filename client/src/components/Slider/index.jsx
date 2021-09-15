import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import style from './style.module.scss'
import {useHistory} from 'react-router-dom'
import {ArrowRight} from '../icons'

const Slider = () => {
    const history = useHistory()

    const sliders = [
        {
            image:'images/img-1.png',
            header:'engine',
            sub_header:'management system',
            target:'/engine',
        },
        {
            image:'images/img-2.png',
            header:'fuel',
            sub_header:'fuel system',
            target:'/fuel',
        },
        {
            image:'images/img-3.png',
            header:'maintenance',
            sub_header:'maintenance system',
            target:'/maintenance',
        },
    ]
    return (
        <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop={true}
        swipeable={true}
        emulateTouch={true}
        className={style.carousel}>
        
        {
            sliders.map(slide => (
                <div style={{cursor:'pointer'}}>
                    <img alt="" src={slide.image}/>
                    <div className={style.carousel__desc}>
                        <h2 className={style.carousel__header}>{slide.header.toLocaleUpperCase()}</h2>
                        <div style={{position:'relative', width:'40rem'}}>
                            <h3 className={style.carousel__subheader}>{slide.sub_header.toLocaleUpperCase()}</h3>
                            <button className={style.carousel__more}>
                                show more <ArrowRight/>
                            </button>
                        </div>
                    </div>
                </div>
            ))
        }
        </Carousel>
    )
}

export default Slider
