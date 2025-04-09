import express from 'express'
import dbConnect from './db.js'
import mongoose from 'mongoose'

const app = express()
const port= 3800
app.use(express.json())

const userSchema =  new mongoose.Schema({
    name:String,
    age:Number,
    email:String
})

const Users = mongoose.model('users',userSchema);

dbConnect().then(()=>{
    app.get('/', async(req,res)=>{
        try{
       const users = await Users.find()
       res.json(users)
        }
        catch(err){
           res.status(500).send('something went wrong')
        }
    })


app.post('/',async(req,res)=>{
    try{
       console.log(req.body) 
       const user=await Users.create(req.body)
       res.status(200).json(user)
    }
    catch(err){
        res.status(500).send('something went wrong')
    }
})

app.get('/:id', async(req,res)=>{
    try{ 
        const id = req.params.id;
        const user= await Users.findById(id);
        user? res.json(user) : res.status(404).send('user not found')
    }
    catch(err){
        res.status(500).send('something went wrong')
    }
})

app.get('/user/search', async (req, res) => {
    try{
    console.log(req.query)    
    const { name } = req.query;
    const users = await Users.find({ name });
    users? res.status(200).json(users) : res.status(404).send('user not found');
    }
    catch(err){
        res.status(500).send('something went wrong') 
    }
  });

  app.put('/:id', async (req, res) => {
    try{
    const updated = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.status(200).json(updated) : res.status(404).send('User not found');
    } catch(err){
        res.status(500).send('something went wrong') 
    }
  });
  
  // DELETE
  app.delete('/:id', async (req, res) => {
    const deleted = await Users.findByIdAndDelete(req.params.id);
    deleted ? res.status(200).json({ msg: 'Deleted successfully' }) : res.status(404).send('User not found');
  });
  
  app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });


}

)