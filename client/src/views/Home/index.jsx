import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Template from '../../components/Template'
import Slider from '../../components/Slider'
import Feature from '../../components/Features'
import CourseSection from '../../components/CourseSection'
// import Instructor from '../../components/Instructor'
import ProductSection from '../../components/ProductSection'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import Instructor from '../../components/Instructor'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state) => state.listProducts
  )

  useEffect(() => {
    dispatch(actions.products.listProducts(undefined, 'isMainPage'))
    AOS.init({ duration: 2000 })
  }, [])

  return (
    <>
      <Helmet>
        <title>Gendy Tronics</title>
        <meta
          name='description'
          content='This Website offering Mechanics Courses for learning every thing related to cars'
        />
      </Helmet>
      <Template>
        <Slider />
        <Feature />
        <CourseSection />
        {/* <Instructor /> */}
        {products &&
          products.map((data) => (
            <ProductSection
              data={data}
              key={data._id}
              loading={loading}
              error={error}
            />
          ))}
      </Template>
    </>
  )
}

export default Home
