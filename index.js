require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const errorMiddleware = require('./src/middlewares/error')
const notFoundMiddleware = require('./src/middlewares/not-found')
const limiter = require('./src/middlewares/rate.limit')
const routerAdmin = require('./src/routes/admin-router')
const routerUser = require('./src/routes/user-router')
const authenticate = require('./src/middlewares/authenticate')
const storeRouter = require('./src/routes/store-router')
const voucherRouter = require('./src/routes/voucher-router')
const orderRouter = require('./src/routes/order-router')

const app = express()

app.use(cors()) //{origin: ['https://']}
app.use(morgan('dev')) //log requset server
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/admin', routerAdmin)
app.use('/user', routerUser)
app.use('/store', authenticate, storeRouter)
app.use('/voucher', authenticate, voucherRouter)
app.use('/orderline', orderRouter)
app.use('/order',authenticate, orderRouter)


app.use(notFoundMiddleware)
app.use(errorMiddleware)

let PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server running on port: ${PORT}`))