import express      from 'express'
import cors         from 'cors'
import dotenv       from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet       from 'helmet'
import morgan       from 'morgan'

import {checkApiKey}      from  './server/src/middlewares/auth.js'
import databaseConnection from  './server/dbConnection.js'
import userRouter         from  './server/src/routers/userRouter.js'
import productRouter      from  './server/src/routers/productRouter.js'
import orderRouter        from  './server/src/routers/orderRouter.js'
import courseRouter       from  './server/src/routers/courseRouter.js'
import reviewRouter       from  './server/src/routers/reviewRouter.js'
import instructorsRouter  from  './server/src/routers/instructorRouter.js'
import blogRouter         from  './server/src/routers/blogRouter.js'
import wishlistRouter     from  './server/src/routers/wishlistRouter.js'
import callRouter         from  './server/src/routers/callRouter.js'
import contactRouter      from  './server/src/routers/contactRouter.js'
import couponRouter       from  './server/src/routers/couponRouter.js'
import driveRouter        from  './server/src/routers/driveRouter.js'
import dashboardRouter    from  './server/src/routers/Dashboard.js'
import sliderRouter       from  './server/src/routers/sliderRouter.js'
import supportRouter       from  './server/src/routers/supportRouter.js'

import {
    notFound, 
    errorHandler
} from './server/src/middlewares/errorHandler.js'

import {fileURLToPath} from 'url'
import path from 'path' 

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 
const trusted = ["'self'", 'https://accounts.google.com/gsi/client']

databaseConnection()

const app = express()
dotenv.config()
app.use(cors())
app.use(helmet({
    contentSecurityPolicy:false
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client/build')))
    app.use(express.static(path.resolve(__dirname, 'admin/build')))
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'))
    })
    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname, 'admin/build/index.html'))
    })
}


app.use('/api/images', express.static(path.resolve(__dirname, 'server/uploads')))
app.use(checkApiKey)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/courses', courseRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/instructors', instructorsRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/calls', callRouter)
app.use('/api/contacts', contactRouter)
app.use('/api/coupons', couponRouter)
app.use('/api/drive', driveRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/sliders', sliderRouter)
app.use('/api/support', supportRouter)
app.use(notFound)
app.use(errorHandler)


const port  =  process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})

console.log(path.resolve(__dirname, 'test.js'))