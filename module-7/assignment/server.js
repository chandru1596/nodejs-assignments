import express from 'express';
import dbConnect from "./db.js";
import { fileURLToPath } from 'url'
import path from 'path'
import { authRouter } from "./auth/authController.js";
import { error } from 'console';
import { dashController } from './auth/dashcontroller.js';


const app = express()
const port = 5200;
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

app.set('view engine', 'ejs')
app.set('views', path.join(_dirname, 'src', 'views'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(_dirname,'src','public')))

dbConnect().then(()=>{
    app.get('/',(req,res)=>{
        res.render('login',{msg:null, error:null})
    })

    app.get('/register',(req,res)=>{
        res.render('register',{error:null})
    })

    app.use('/auth', authRouter)

    app.use('/dash',dashController)

    app.listen(port,()=>{
        console.log('server running on port', port)
    })
})

