import { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './views/Home'
import Account from './views/Account'
import Login from './views/Login'
import Signup from './views/Signup'
import Blogs from './views/AllBlogs'
import Blog from './views/Blog'
import Products from './views/AllProducts'
import Product from './views/Product'
import PrivacyPolicy from './views/PrivacyPolicy'
import TermsAndCondition from './views/TermsAndConditions'
import SalesTerms from './views/SalesTerms/indx'
import VideoGallery from './views/VideoGallery'
import PhotoGallery from './views/PhotoGallery'
import Course from './views/Course'
import Courses from './views/allCourses'
import Contact from './views/ContactUs'
import CoursePayment from './views/CoursePayment'
import CourseLearn from './views/CourseLearn'
import OrderProcess from './views/OrderProcess'
import VerifyEmail from './views/VerifyEmail'
import ResetEmail from './views/ResetEmail'
import NotFound from './views/Notfound'

function App() {
  const { pathname } = useLocation()
  const { lang } = useSelector((state) => state.language)
  const { isAuth } = useSelector((state) => state.client)

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log('Node Env: ', import.meta.env.MODE)
  }, [pathname, lang])
  return (
    <div
      className='App'
      style={{
        fontFamily: lang === 'en' ? 'Roboto, sans-serif' : 'Cairo, sans-serif',
        direction: lang === 'en' ? 'ltr' : 'rtl',
      }}
    >
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/account'>{isAuth ? <Account /> : <Home />}</Route>
        <Route path='/login'>{isAuth ? <Home /> : <Login />}</Route>
        <Route path='/signup'>{isAuth ? <Home /> : <Signup />}</Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/courses'>
          <Courses />
        </Route>
        <Route path='/course/:id' exact>
          <Course />
        </Route>
        <Route path='/course/:id/payment' exact>
          {isAuth ? <CoursePayment /> : <Login />}
        </Route>
        <Route path='/course/:id/learn'>
          {isAuth ? <CourseLearn /> : <Login />}
        </Route>
        <Route path='/product/:id?'>
          <Product />
        </Route>
        <Route path='/order'>{isAuth ? <OrderProcess /> : <Login />}</Route>
        <Route path='/blog/:id'>
          <Blog />
        </Route>
        <Route path='/blogs'>
          <Blogs />
        </Route>
        <Route path='/privacy-policy'>
          <PrivacyPolicy />
        </Route>
        <Route path='/terms-and-condition'>
          <TermsAndCondition />
        </Route>
        <Route path='/sales-terms'>
          <SalesTerms />
        </Route>
        <Route path='/videos'>
          <VideoGallery />
        </Route>
        <Route path='/gallery'>
          <PhotoGallery />
        </Route>
        <Route path='/contact-us'>
          <Contact />
        </Route>
        <Route path='/activate'>
          <VerifyEmail />
        </Route>
        <Route path='/reset'>
          <ResetEmail />
        </Route>
        <Route path='/static/*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
