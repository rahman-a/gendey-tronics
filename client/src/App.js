import {useEffect} from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import Home from "./views/Home";
import Account from './views/Account'
import Login from './views/Login';
import Signup from './views/Signup';
import Blogs from './views/AllBlogs'
import Blog from './views/Blog'
import Products from './views/AllProducts'
import Product from './views/Product'
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsAndCondition from "./views/TermsAndConditions";
import SalesTerms from "./views/SalesTerms/indx";
import VideoGallery from "./views/VideoGallery";
import PhotoGallery from "./views/PhotoGallery";
import Course from './views/Course'
import Courses from './views/allCourses'
import Contact from './views/ContactUs'
import CoursePayment from './views/CoursePayment';
import CourseLearn from './views/CourseLearn';
import OrderProcess from './views/OrderProcess';

function App() {
  const {pathname} = useLocation()
  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname])
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Home/> 
        </Route>
        <Route path='/account'>
          <Account/> 
        </Route>
        <Route path='/login'>
          <Login/> 
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/products'>
          <Products/>
        </Route>
        <Route path='/courses'>
          <Courses/>
        </Route>
        <Route path='/course' exact>
          <Course/>
        </Route>
        <Route path='/course/payment'>
          <CoursePayment/>
        </Route>
        <Route path='/course/learn'>
          <CourseLearn/>
        </Route>
        <Route path='/product/:id?'>
          <Product/>
        </Route>
        <Route path='/order'>
          <OrderProcess/>
        </Route>
        <Route path='/blogs'>
          <Blogs/>
        </Route>
        <Route path='/blog'>
          <Blog/> 
        </Route>
        <Route path='/privacy-policy'>
          <PrivacyPolicy/> 
        </Route>
        <Route path='/terms-and-condition'>
          <TermsAndCondition/> 
        </Route>
        <Route path='/sales-terms'>
          <SalesTerms/> 
        </Route>
        <Route path='/videos-gallery'>
          <VideoGallery/> 
        </Route>
        <Route path='/photo-gallery'>
          <PhotoGallery/> 
        </Route>
        <Route path='/contact-us'>
          <Contact/> 
        </Route>
      </Switch>
    </div>
  );
}

export default App;
