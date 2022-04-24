import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Header, Footer } from './components'
import action from './actions'

import {
  Login,
  Dashboard,
  Users,
  Products,
  Product,
  NewProduct,
  Blogs,
  NewBlog,
  Blog,
  Orders,
  Courses,
  Course,
  NewCourse,
  Slider,
  Contacts,
  Profile,
  Drive,
  Calls,
  Support,
  Menu,
  Instructors,
  Photos,
  Videos,
  NotFound,
} from './views'

function App() {
  const { isAuth } = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    isAuth && dispatch(action.admin.getAdminAvatar())
  }, [isAuth, dispatch])

  return (
    <div className='App'>
      <Header />
      <div className='wrapper'>
        <Switch>
          <Route path='/login'>
            {isAuth ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route path='/' exact>
            {isAuth ? <Dashboard /> : <Redirect to='/login' />}
          </Route>
          <Route path='/users'>
            {isAuth ? <Users /> : <Redirect to='/login' />}
          </Route>
          <Route path='/products' exact>
            {isAuth ? <Products /> : <Redirect to='/login' />}
          </Route>
          <Route path='/products/new' exact>
            {isAuth ? <NewProduct /> : <Redirect to='/login' />}
          </Route>
          <Route path='/products/orders' exact>
            {isAuth ? <Orders /> : <Redirect to='/login' />}
          </Route>
          <Route path='/products/:id'>
            {isAuth ? <Product /> : <Redirect to='/login' />}
          </Route>
          <Route path='/blogs' exact>
            {isAuth ? <Blogs /> : <Redirect to='/login' />}
          </Route>
          <Route path='/blogs/new' exact>
            {isAuth ? <NewBlog /> : <Redirect to='/login' />}
          </Route>
          <Route path='/blogs/:id'>
            {isAuth ? <Blog /> : <Redirect to='/login' />}
          </Route>
          <Route path='/courses' exact>
            {isAuth ? <Courses /> : <Redirect to='/login' />}
          </Route>
          <Route path='/courses/new'>
            {isAuth ? <NewCourse /> : <Redirect to='/login' />}
          </Route>
          <Route path='/courses/:id'>
            {isAuth ? <Course /> : <Redirect to='/login' />}
          </Route>
          <Route path='/profile'>
            {isAuth ? <Profile /> : <Redirect to='/login' />}
          </Route>
          <Route path='/drive'>
            {isAuth ? <Drive /> : <Redirect to='/login' />}
          </Route>
          <Route path='/calls'>
            {isAuth ? <Calls /> : <Redirect to='/login' />}
          </Route>
          <Route path='/contacts'>
            {isAuth ? <Contacts /> : <Redirect to='/login' />}
          </Route>
          <Route path='/slider'>
            {isAuth ? <Slider /> : <Redirect to='/login' />}
          </Route>
          <Route path='/menu'>
            {isAuth ? <Menu /> : <Redirect to='/login' />}
          </Route>
          <Route path='/instructors'>
            {isAuth ? <Instructors /> : <Redirect to='/login' />}
          </Route>
          <Route path='/photos'>
            {isAuth ? <Photos /> : <Redirect to='/login' />}
          </Route>
          <Route path='/videos'>
            {isAuth ? <Videos /> : <Redirect to='/login' />}
          </Route>
          <Route path='/support/:id?'>
            {isAuth ? <Support /> : <Redirect to='/login' />}
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
