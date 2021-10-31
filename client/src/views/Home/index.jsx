import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Template from '../../components/Template'
import Slider from '../../components/Slider'
import Feature from '../../components/Features'
import CourseSection from '../../components/CourseSection'
import Instructor from '../../components/Instructor'
import ProductSection from '../../components/ProductSection'
import productData from './data';

const Home = () => {    
    useEffect(() => {
        AOS.init({duration:2000})
    })
    return (
        <>
         <Template>
            <Slider/>
            <Feature/>
            <CourseSection/>
            <Instructor/>
            {
                productData.map(data => (
                    <ProductSection data={data} key={data._id}/>
                ))
            }
        </Template> 
        </>
    )
}

export default Home
