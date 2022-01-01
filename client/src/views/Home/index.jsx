import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Template from '../../components/Template'
import Slider from '../../components/Slider'
import Feature from '../../components/Features'
import CourseSection from '../../components/CourseSection'
import Instructor from '../../components/Instructor'
import ProductSection from '../../components/ProductSection'
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../actions';
import mappingProducts from './data';

const Home = () => {
    const dispatch = useDispatch()
    const {loading, error, products} = useSelector(state => state.listProducts)
    
    
    useEffect(() => {
        dispatch(actions.products.listProducts())
        AOS.init({duration:2000})
    },[])
    return (
        <>
         <Template>
            <Slider/>
            <Feature/>
            <CourseSection/>
            <Instructor/>
            {
               products && mappingProducts(products).map(data => (
                    <ProductSection data={data} 
                    key={data._id} 
                    loading={loading}
                    error={error}/>
                ))
            }
        </Template> 
        </>
    )
}

export default Home
