import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect} from 'react-router-dom'
import {Header, Footer} from './components'

import { 
  Login, 
  Dashboard,
  Notifications,
  Messages,
  Profile,
  NotFound
} from './views'

function App() {
  const {isAuth} = useSelector(state => state.login)
  
  return (
    <div className='App'>
      <Header/>
        <Switch>
            <Route path='/login'>
              {isAuth ? <Dashboard/> : <Login/>}
            </Route>
            <Route path='/' exact>
              {isAuth ? <Dashboard/> : <Redirect to='/login'/>}
            </Route>
            <Route path='/profile'>
                {isAuth ? <Profile/> :<Redirect to='/login'/>}
            </Route>
            <Route path='/messages'>
                {isAuth ? <Messages/> : <Redirect to='/login'/>}
            </Route>
            <Route path='/notifications'>
                {isAuth ? <Notifications/> : <Redirect to='/login'/>}
            </Route>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
      <Footer/>
    </div>
  );
}

export default App;