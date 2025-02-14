const {MongoClient}=require('mongodb')

const mongoURL="mongodb://localhost:27017"

const mongoClient= new MongoClient(mongoURL)

const connectDB= async ()=>{
    try{
    await mongoClient.connect()
    console.log('connected successfully')
    const db= await mongoClient.db('nodelearning')
    const collection=await db.collection('movies')

    // const findAll =await collection.find().toArray()

    // const findOne = await collection.findOne({name:"Black Panther"})

    // const highRate = await collection.aggregate([
    //     {$sort:{rate:-1}},
    //     {$limit:3}
    // ]).toArray()

    //  await collection.updateMany({rate:5},{$set : {achievements:"Super Duper Hit"}})
    //  await collection.updateMany({rate:4.5},{$set : {achievements:"Super Hit"}})

//    const result= await collection.find({achievements:{$in:['Super Duper Hit','Super Hit']}}).toArray()

const result= await collection.find({$or:[{achievements:'Super Duper Hit'},{achievements:'Super Hit'}]}).toArray()
     
    // const achievements = await collection.find({achievements: {$exists:true,$ne:''}}).toArray()


    console.log('movies',result)
}catch(err){
    console.error(err)
}


}

connectDB()