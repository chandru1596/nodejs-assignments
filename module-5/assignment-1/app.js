import express from 'express'
import dbConnect from './db.js'
import { userOrderRoute } from './routes/userOrder.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { dashboardRoute } from './routes/dashboardroute.js'

const app = express()

const port = 8400
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
app.set('view engine', 'ejs')
app.set('views', path.join(_dirname,'src','views'))
app.use(express.static(path.join(_dirname,'src','public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

dbConnect().then(()=>{
    app.get('/',(req,res)=>{
        res.render('userOrderTemp',{title:'Place Order'})
    })
    app.get('/viewOrders',(req,res)=>{
        res.render('dashboard',{title:'Order Details'})
    })
    app.use('/user-order', userOrderRoute)
    app.use('/order-details',dashboardRoute)
    app.listen(port,()=>{
        console.log('server running on', port)
    })
})

