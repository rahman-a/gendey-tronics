import React, {useRef} from 'react'
import ProductCard from '../ProductCard'
import style from './style.module.scss'
import CardSlider from '../CardSlider'

const ProductSection = ({data}) => {
    const containerRef = useRef(null)
    return (
        <div className={style.productSection}>
            <div className="container" 
            ref={containerRef}
            style={{position:'relative', overflow:'hidden'}}
            data-aos='fade-left'>
                <CardSlider length={data.cards.length} containerRef={containerRef} title={data.title}>
                    {
                        data.cards.map(card => (
                            <ProductCard card={card} key={card._id}/>
                        ))
                    }
                </CardSlider>

            </div>
        </div>
    )
}

export default ProductSection
