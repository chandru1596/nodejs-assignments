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

app.set('views',path.join(__dirname,'src','view'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'src','public')))

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
        res.render('employes',{filterdata, title:'Employee Details'})
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
        res.render('projects',{filterdata,title:'Project Details'})
    }

    else{
        res.status(404).send('ID not found')
    }} catch(err){
        console.error(err)
        res.status(500).send("Internal Server Error");
    }
})

app.get('/getemployeedetails',async (req,res)=>{
    try{
    const employeeDetail = await getDetails('employees.json');
    const projectDetail = await getDetails('projects.json')

   employeeInfo= await employeeDetail.map(emp => {
    const project=  projectDetail.find(x=>x.ProjectID == emp.ProjectID)
    
    return {...emp,project}
})

  res.render('employeinfo',{employeeInfo,title:'All Employees'})


    }catch(err){
        res.status(500).send('Internal server error')
        console.log(err)

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
