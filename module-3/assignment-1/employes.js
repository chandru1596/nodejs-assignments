const express = require ('express')

const app =express()
const fs = require('fs').promises
const path= require('path')

const port = 5200

// function getDetails(pathname){
//     return new Promise((resolve,reject)=>{
//     const filepath= path.join(__dirname,'src','db',pathname)

//     fs.readFile(filepath,'utf-8',(err,file)=>{
//         if(err){
//             reject(err)
//         }
//         else{
//             resolve(JSON.parse(file))
//         }
//     })

//     })
// }

async function getDetails(pathname){
    try{
    const filepath= path.join(__dirname,'src','db',pathname)
    
    const file = await fs.readFile(filepath,'utf-8')
    return JSON.parse(file)
    }
    catch(err){
        throw new Error(`Error reading file: ${pathname} - ${err.message}`);
    } 
}

app.get('/',(req,res)=>{
    res.send('welcome to employees page')
})

app.get('/employee/:id',async(req ,res)=>{
    try{
    const empID= req.params.id
    const file = await getDetails('employees.json')
    const filterdata= await file.find(x=>x.EmployeeID == empID )
    if(filterdata){
        res.json(filterdata)
    }
    else{
        res.status(400).send('ID not found')
    }
} catch(err){
     console.error(err)
     res.status(500).send("Internal Server Error");
}
})

app.get('/project/:id', async(req,res)=>{
    try{
    const projectID= req.params.id;
    const file =await getDetails('projects.json')
    const filterdata= await file.find(x=>x.ProjectID==projectID)
    if(filterdata){
        res.json(filterdata)
    }

    else{
        res.status(404).send('ID not found')
    }} catch(err){
        console.error(err)
        res.status(500).send("Internal Server Error");
    }
})


app.listen(port,(err)=>{
    if(err){
        console.error('network error')
    }
    else{
        console.log('server running on' , port)
    }
})
