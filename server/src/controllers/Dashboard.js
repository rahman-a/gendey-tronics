import User from '../models/userModal.js'
import Course from '../models/courseModal.js'
import Product from '../models/productModal.js'
import Order from '../models/orderModal.js'
import Enrollment from '../models/enrollmentModal.js'
import Blog from '../models/blogModel.js'
import Contact from '../models/contactModal.js'
import Calls from '../models/callsModal.js'

export const mainDashboardInfo = async (req, res, next) => {
    try {
        const users = await User.count({})
        const courses = await Course.count({})
        const products = await Product.count({})
        const blogs = await Blog.count({})
        const orders = await Order.find({})
        const ordersCount = await Order.count({})
        const enrollments = await Enrollment.find({})
        const enrollmentsCount = await Enrollment.count({})

        const totalOrderSales = orders.reduce((acc, item) => item.totalPrice  + acc, 0)
        const totalEnrollmentSales = enrollments.reduce((acc, item) => item.payment  + acc, 0)

        res.send({
            success:true,
            code:200,
            info:{
                users, 
                courses, 
                products,
                blogs, 
                orders:{count:ordersCount, sales:totalOrderSales}, 
                enrollments:{count:enrollmentsCount, sales:totalEnrollmentSales}
            }
        })

    } catch (error) {
        next(error)
    }
}

export const latestRegisteredUsers = async (req, res, next) => {
    try {
        
        const users = await User.find({}, {
            firstName:1,
            lastName:1,
            createdAt:1
        }).sort({createdAt:-1}).limit(10)
        
        res.send({
            success:true,
            code:200,
            users
        })
    } catch (error) {
        next(error)
    }
}

export const latestContactsAndCalls = async (req, res, next) => {
    
    try {
        const contacts = await Contact.find({isRead:false},{
            name:1,
            message:1,
            createdAt:1
        }).sort({createdAt:-1}).limit(10)
        

        const calls = await Calls.find({isDone:false}, {
            phone:1,
            method:1,
            createdAt:1
        }).sort({createdAt:-1}).limit(10)

        const mappedContacts = contacts.map(contact => {
            return {
              _id:contact._id,
              title:`New Contact from ${contact.name}`,
              createdAt:contact.createdAt
            }
          })
      
          const mappedCalls = calls.map(call => {
            return {
              _id:call._id,
              title:`New Booking from ${call.phone}`,
              createdAt:call.createdAt
            }
          })

        res.send({
            success:true,
            code:200,
            info:[...mappedCalls, ...mappedContacts]
        })

    } catch (error) {
        next(error)
    }
}

export const latestListedOrders = async (req, res, next) => {
    try {
        const today = new Date()
        const lastWeek  = new Date(new Date().setDate(new Date().getDate() - 7))
        
        const weekDayCount = {
            saturday:0,
            sunday:0,
            monday:0,
            tuesday:0,
            wednesday:0,
            thursday:0,
            friday:0
        }

        const orders = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:lastWeek,
                        $lte:today
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    day:{$dayOfWeek:"$createdAt"}
                }
            }
        ])

        orders.forEach(({day}) => {
            if (day === 1) weekDayCount['sunday'] =+ weekDayCount['sunday'] + 1
            if (day === 2) weekDayCount['monday'] =+ weekDayCount['monday'] + 1
            if (day === 3) weekDayCount['tuesday'] =+ weekDayCount['tuesday'] + 1
            if (day === 4) weekDayCount['wednesday'] =+ weekDayCount['wednesday'] + 1
            if (day === 5) weekDayCount['thursday'] =+ weekDayCount['thursday'] + 1
            if (day === 6) weekDayCount['friday'] =+ weekDayCount['friday'] + 1
            if (day === 7) weekDayCount['saturday'] =+ weekDayCount['saturday'] + 1
        })

        res.send({
            success:true,
            code:200,
            orders:Object.values(weekDayCount)
        })
    } catch (error) {
        next(error)
    }
}

export const latestEnrollments = async (req, res, next) => {
    try {
        const today = new Date()
        const lastWeek  = new Date(new Date().setDate(new Date().getDate() - 7))
        
        const weekDayCount = {
            saturday:0,
            sunday:0,
            monday:0,
            tuesday:0,
            wednesday:0,
            thursday:0,
            friday:0
        }

        const enrollments = await Enrollment.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:lastWeek,
                        $lte:today
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    day:{$dayOfWeek:"$createdAt"}
                }
            }
        ])

        enrollments.forEach(({day}) => {
            if (day === 1) weekDayCount['sunday'] =+ weekDayCount['sunday'] + 1
            if (day === 2) weekDayCount['monday'] =+ weekDayCount['monday'] + 1
            if (day === 3) weekDayCount['tuesday'] =+ weekDayCount['tuesday'] + 1
            if (day === 4) weekDayCount['wednesday'] =+ weekDayCount['wednesday'] + 1
            if (day === 5) weekDayCount['thursday'] =+ weekDayCount['thursday'] + 1
            if (day === 6) weekDayCount['friday'] =+ weekDayCount['friday'] + 1
            if (day === 7) weekDayCount['saturday'] =+ weekDayCount['saturday'] + 1
        })

        res.send({
            success:true,
            code:200,
            enrollments:Object.values(weekDayCount)
        })
    } catch (error) {
        next(error)
    }
}