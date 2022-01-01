import React, {useEffect} from 'react'
import Fav from './fav'
import style from './style.module.scss'
import Loader from '../Loader'
import { useHistory, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import actions from '../../actions'
import strings from '../../localization'

const FavouriteList = () => {
    const hash = useLocation().hash.substr(1)
    const history = useHistory()
    const {loading, error, products} = useSelector(state => state.FavProducts)
    const {lang} = useSelector(state => state.language)
    const dispatch = useDispatch()

   const fetchFavProducts = () => {
        hash === 'favourites'
        && !products 
        && dispatch(actions.products.FavProducts())
   }

    useEffect(() => {
        fetchFavProducts()
    }, [hash])
    return (
        <div className={style.favList}
        style={{position:'relative', 
            minHeight:(loading || error) ? '35rem': '0',
            paddingTop:(loading || error) ? '3rem': '0'}}>
            {loading 
            ?<Loader size='25' center/>
            :error 
            ? <div className={style.favList__none}>
                <p>{strings.client[lang].no_favourite}</p>
                <button onClick={() => history.push('/')}>{strings.client[lang].browse_product}</button>
            </div>
            :products 
            && <>
            <div className={`${style.favList__titles} 
            ${lang === 'ar' ? style.favList__titles_ar :''}`}>
                <p>{strings.client[lang].item}</p>
                <p>{strings.client[lang].price}</p>
                <p>{strings.client[lang].cart_add}</p>
                <p>{strings.client[lang].delete}</p>
            </div>
            <div className={style.favList__items}>
                {
                    products.map(product => (
                        <Fav key={product._id} product={product} lang={lang} strings={strings}/>
                    ))
                }
            </div>
            </>
            }
            
        </div>
    )
}

export default FavouriteList
