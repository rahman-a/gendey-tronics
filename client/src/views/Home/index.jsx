import React from 'react'
import Template from '../../components/Template'
import Slider from '../../components/Slider'
import Feature from '../../components/Features'
import CourseSection from '../../components/CourseSection'
import Instructor from '../../components/Instructor'
import ProductSection from '../../components/ProductSection'

const Home = () => {
    const productData = [
        {
            _id:1,
            title:'immo files',
            cards:[
                {
                    _id:1,
                    image:'images/immo/immo-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/immo'
                },
                {
                    _id:2,
                    image:'images/immo/immo-2.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/immo'
                },
                {
                    _id:3,
                    image:'images/immo/immo-3.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/immo'
                },
                {
                    _id:4,
                    image:'images/immo/immo-4.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/immo'
                },
                {
                    _id:5,
                    image:'images/immo/immo-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/immo'
                }
            ]
        },
        {
            _id:2,
            title:'tunning files',
            cards:[
                {
                    _id:1,
                    image:'images/tunning/tunning-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                },
                {
                    _id:2,
                    image:'images/tunning/tunning-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                },
                {
                    _id:3,
                    image:'images/tunning/tunning-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                },
                {
                    _id:4,
                    image:'images/tunning/tunning-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                },
                {
                    _id:5,
                    image:'images/tunning/tunning-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                }
            ]
        },
        {
            _id:3,
            title:'hardware tools',
            cards:[
                {
                    _id:1,
                    image:'images/hardware/hard-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:2,
                    image:'images/hardware/hard-2.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:3,
                    image:'images/hardware/hard-3.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:4,
                    image:'images/hardware/hard-4.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:5,
                    image:'images/hardware/hard-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                }
            ]
        },
        {
            _id:4,
            title:'hardware tools',
            cards:[
                {
                    _id:1,
                    image:'images/hardware/air-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:2,
                    image:'images/hardware/air-2.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:3,
                    image:'images/hardware/air-3.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:4,
                    image:'images/hardware/air-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:5,
                    image:'images/hardware/air-2.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                }
            ]
        },
        {
            _id:5,
            title:'hardware tools',
            cards:[
                {
                    _id:1,
                    image:'images/hardware/air-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:2,
                    image:'images/hardware/air-2.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:3,
                    image:'images/hardware/air-3.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:4,
                    image:'images/hardware/air-1.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/hardware'
                },
                {
                    _id:5,
                    image:'images/hardware/air-2.png',
                    price:24.99,
                    name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                    target:'/tunning'
                }
            ]
        },
        
    ]
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
