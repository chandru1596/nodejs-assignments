const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const port = 5000

app.get('/',(req,res,next)=>{
    res.send(`<h1> Welcome to my server</h1>`)
})

app.get('/getMovies',(req,res)=>{
    const jsonPath= path.join(__dirname,'db.json')

    fs.readFile(jsonPath,'utf-8',(err,file)=>{
        if(err){
            console.error(err)
            return res.status(500).json({error:'failed to read file'})
        }

        else{
            try{
                // why using parse here. because the readfile reads the file as string. we have to send the data as actual javascript object.
                res.json(JSON.parse(file))  // res.json will automatically sets the content-type application/json

            }
            catch(error){
                console.error(error,'invalid JSON format')
                res.status(500).json({error:'invalid JSON in DB'})
            }
        }
    })
})


app.listen(port,()=>{
    console.log('my server is running on port',port)
})