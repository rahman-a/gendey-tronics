import React, {useState, useEffect} from 'react';
import style from './style.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import actions from '../../actions'
import {
  AddressCard,
  GraduationCap,
  CashRegister,
  Chalkboard,
  Newspaper,
  Car,
} from '../../icons'
import {Loader} from '../../components'
import Segment from './Segment'
import {PieChart} from './Pie'
import Timeline from './Timeline';
import LoadingSegment from './LoadingSegment'
import LoadingTimeLine from './LoadingTimeline';

const Home = () => {
  const dispatch = useDispatch()
  const {loading, info} = useSelector(state => state.dashboardInfo)
 
  const {
    loading:users_loading,
    users 
  } = useSelector(state => state.latestUsers)

  const {
    loading:orders_loading,
    orders 
  } = useSelector(state => state.latestOrders)
  
  const {
    loading:enrollments_loading,
    enrollments 
  } = useSelector(state => state.latestEnrollments)
  
  const {
    loading:contacts_loading,
    contacts 
  } = useSelector(state => state.latestContactsInfo)
  
  const segments = [
    {
      id:uuidv4(),
      title:'Registered Users',
      icon:<AddressCard/>,
      type:'primary',
      page:'/users',
      value:info?.users
    },
    {
      id:uuidv4(),
      title:'Courses',
      icon:<Chalkboard/>,
      type:'danger',
      page:'/courses',
      value:info?.courses
    },
    {
      id:uuidv4(),
      title:'Products',
      icon:<Car/>,
      type:'success',
      page:'/products',
      value:info?.products
    },
    {
      id:uuidv4(),
      title:'Enrollments',
      icon:<GraduationCap/>,
      type:'dark',
      page:'/courses',
      value:info?.enrollments?.count,
      sales:info?.enrollments?.sales,
    },
    {
      id:uuidv4(),
      title:'Orders',
      icon:<CashRegister/>,
      type:'info',
      page:'/products/orders',
      value:info?.orders?.count,
      sales:info?.orders?.sales
    },
    {
      id:uuidv4(),
      title:'Blogs',
      icon:<Newspaper/>,
      type:'warning',
      page:'/blogs',
      value:info?.blogs
    },
    
  ]

  const testValues = [2,6,4,6,3,2,5]
  
  useEffect(() => {
    dispatch(actions.dashboard.getDashboardInfo())
    dispatch(actions.dashboard.getLatestContacts())
    dispatch(actions.dashboard.getLatestEnrollments())
    dispatch(actions.dashboard.getLatestOrders())
    dispatch(actions.dashboard.getLatestUsers())
  },[])

  return (
    <div className={style.dashboard}>
      
      <div className={style.dashboard__overview}>
       {
         loading 
         ? [...Array(segments.length)].map(_ => (
           <LoadingSegment key={uuidv4()}/>
         ))
         : info && segments.map(({id, type,page, value,title,icon, sales}) => (
            <Segment
            key={id} 
            type={type}
            value={value} 
            title={title}
            page={page}
            sales={sales}
            icon={icon} />
         ))
       }
      </div>
      
      
      <div className={style.dashboard__container}>
        <div className={style.dashboard__info}>
          <div className={style.dashboard__pie}>
            <h2>Latest Enrollments</h2>
            {
                 enrollments_loading
                ? <Loader size='8' options={{animation:'border'}}/>
                : enrollments && <PieChart values={enrollments}/>
              }
          </div>
          <div className={style.dashboard__timeline}>
                <h2>Latest Registered Users</h2>
                
                {
                  users_loading 
                  ? [...Array(5)].map(_ => (
                    <LoadingTimeLine key={uuidv4()}/>
                  ))
                  : users && users.map(user => (
                    <Timeline 
                    key={user._id} 
                    title={`New Member ${user.firstName} ${user.lastName}`}
                    date={user.createdAt}
                   />
                  ))
                }
            </div>
        </div>
        <div className={style.dashboard__info}>
            <div className={style.dashboard__pie}>
              <h2>Latest Orders</h2>
              {
                orders_loading 
                ? <Loader size='8' options={{animation:'border'}}/>
                : orders && <PieChart values={orders}/>
              }
              
            </div>
            <div className={style.dashboard__timeline}>
                <h2>Latest Contacts And Calls</h2>
                
                {
                  contacts_loading 
                  ? [...Array(5)].map(_ => (
                    <LoadingTimeLine key={uuidv4()}/>
                  ))
                  : contacts && contacts.map(contact => (
                    <Timeline 
                    key={contact._id} 
                    title={contact.title}
                    date={contact.createdAt}
                   />
                  ))
                }
            </div>
        </div>
      </div>
    </div>
  )
};

export default Home;

