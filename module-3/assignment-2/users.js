const express=require('express')
const app = express()
const axios = require('axios')
const path = require('path')

const port=5500

const userURL='http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees'

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname,'src','views'))

app.use(express.static(path.join(__dirname,'src','public')))

app.get('/', (req,res)=>{
    res.send('welcome to view users')
})

app.get('/users',async(req,res)=>{

    try{
        const userList= await axios.get(userURL)
        if(userList){
            const users= userList.data
            res.render('user',{users,title:'Users'})
            // res.json(userList.data)
        }

        else{
            res.status(404).send('user list not found ')
        }

    }catch(err){
        res.status(500).send('Internal server error')

    }
})


app.listen(port,(err)=>{
    if(err){
        console.error(err)
        return
    }

    else{
        console.log('server running on ', port)
    }
})