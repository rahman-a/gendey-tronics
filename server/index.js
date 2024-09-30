import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import path from 'path'
import { checkApiKey } from './src/middlewares/auth.js'
import databaseConnection from './src/dbConnection.js'
import userRouter from './src/routers/userRouter.js'
import productRouter from './src/routers/productRouter.js'
import orderRouter from './src/routers/orderRouter.js'
import courseRouter from './src/routers/courseRouter.js'
import reviewRouter from './src/routers/reviewRouter.js'
import instructorsRouter from './src/routers/instructorRouter.js'
import blogRouter from './src/routers/blogRouter.js'
import wishlistRouter from './src/routers/wishlistRouter.js'
import callRouter from './src/routers/callRouter.js'
import contactRouter from './src/routers/contactRouter.js'
import couponRouter from './src/routers/couponRouter.js'
import driveRouter from './src/routers/driveRouter.js'
import dashboardRouter from './src/routers/Dashboard.js'
import sliderRouter from './src/routers/sliderRouter.js'
import supportRouter from './src/routers/supportRouter.js'
import adminRouter from './src/routers/adminRouter.js'
import menuRouter from './src/routers/menuRouter.js'
import mediaRouter from './src/routers/mediaRouter.js'
import purchaseRouter from './src/routers/purchaseRouter.js'
import { incomingEmails } from './src/controllers/supportControllers.js'
import { uploadHandler } from './src/middlewares/upload.js'
import { notFound, errorHandler } from './src/middlewares/errorHandler.js'
import { DIRNAME } from './src/constants.js'

// DATABASE CONNECTION
databaseConnection()

// ENVIRONMENT VARIABLES
dotenv.config({
  path: path.join(DIRNAME, '.env'),
})

// INITIALIZE APP
const app = express()

// MIDDLEWARES
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://www.gendyecu.com',
            'https://gendyecu.com',
            'https://admin.gendyecu.com',
          ]
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(express.urlencoded({ extended: false }))

// RECEIVING E-MAILS COMING FROM MAILGUN
app.post(
  '/api/support/incoming',
  (req, res, next) => {
    if (req.body['X-Mailgun-Incoming'] === 'Yes') {
      next()
    } else {
      res.status(400).json({
        message: 'Invalid request',
      })
    }
  },
  uploadHandler.any(),
  incomingEmails
)

// SERVING IMAGES
app.use('/api/images', express.static(path.join(DIRNAME, 'src/uploads')))
app.use('/api/files', express.static(path.join(DIRNAME, 'src/files')))
// CHECKING API KEY
app.use('/api/*', checkApiKey)

// ROUTERS
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
app.use('/api/admin', adminRouter)
app.use('/api/menu', menuRouter)
app.use('/api/media', mediaRouter)
app.use('/api/purchase', purchaseRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

// RUN SERVER
app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
