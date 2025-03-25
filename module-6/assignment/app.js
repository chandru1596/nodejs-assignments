import express from 'express'
import dbConnect from './db.js'
import { bugSchema } from './models/bugSchema.js';
import { fileURLToPath } from 'url'
import path from 'path'
import moment from 'moment';

const app = express();
const port = 5900;
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

app.set('view engine', 'ejs')
app.set('views', path.join(_dirname, 'src', 'views'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(_dirname,'src','public')))

dbConnect().then(()=>{
   
    app.get('/',async(req,res)=>{
      try{
        const data = await bugSchema.find()
        console.log(data)
        res.render('bugTrack',{data,moment})
      }
      catch(error){
         res.status(500).json({message:'something went wrong', error:error}) 
      } 
    })

    app.post('/addBug', async (req,res)=>{
        try{
        const data= req.body
        const result= await new bugSchema(data).save()
        console.log(result)
        res.redirect('/')
        }catch(err){
            res.status(500).json({error:err})
        }
    })


    app.listen(port,()=>{
        console.log('server running on this port', port)
    })
})