import React from 'react'
import Fav from './fav'
import style from './style.module.scss'

const FavouriteList = () => {
    // const [isFav, setIsFav] = useState(true)
    const isFav = true
    return (
        <div className={style.favList}>
            {isFav 
            ?<>
            <div className={style.favList__titles}>
                <p>Item</p>
                <p>Price</p>
                <p>Add to Cart</p>
                <p>Delete</p>
            </div>
            <div className={style.favList__items}>
                {
                    [...Array(4)].map((_, idx) => (
                        <Fav key={idx}/>
                    ))
                }
            </div>
            </>
            : <div className={style.favList__none}>
                    <p>There is no Favourite Product yet</p>
                    <button>Browse the products</button>
            </div>}
            
        </div>
    )
}

export default FavouriteList
