const dbConnect = require('../db')
// getting news data from mongoDB
const getAllNewsData =  async (req, res)=>{
    try {
        let data  = await dbConnect();
        data = await data.collection('news').find({}).toArray();
        if(data && data.length>0){
            console.log("News Data=>", data)
            return res.status(200).json({
                msg:'News fetch successfully',
                totalCount:data.length || 0,
                status:data || []
            })
        }else{
            return res.status(404).json({
                msg:'Page Not Found',
                totalCount:data.length || 0,
                status:[]
            })
        }
    } catch (error) {
        console.log("NewsUserData loading failed=>", error)
    }
}
// adding news data in mongoDB
const addNewsData =  async (req,res)=>{
    try {
        let data = await dbConnect();
        data = await data.collection('news').insertOne({
        title:req.body.title,
        createdBY:  await data.collection('users').findOne(req.body.name),
        createdAt:new Date().toISOString()
    })
    if(data && data.length>0){
        console.log("data=>", data)
        return res.status(200).json({
            msg:'News added successfully',
            totalCount:data.length || 0,
            status:res || []
        })
    }else{
        return res.status(401).json({
            msg:'You dont have access',
            totalCount:data.length || 0,
            status:[]
        })
    }
    } catch (error) {
        console.log("create Error=>", error)
    }
}
// updating news data in mongodb
const updateNewsData =async (req,res)=>{
    try {
        let data = await dbConnect();
        data = await data.collection('news').updateOne(
        {title: req.params.title},
        {$set:req.body}
    )
    if(data && data.length>0){
        console.log("updated data=>", data)
        return res.status(200).json({
            msg:'News updated successfully',
            totalCount:data.length || 0,
            status:data || []
        })
    }else{
        return res.status(404).json({
            msg:'You dont have access',
            totalCount:data.length || 0,
            status:[]
        })
    }
    } catch (error) {
        console.log("update Error=>", error)
    }
    
  
}
// deleting news data in mongodb
const deleteNewsData =async (req,res)=>{
    try {
        let data = await dbConnect();
        data = await data.collection('news').deleteOne(
            {_id:new mongodb.ObjectId(req.params.id)}
        )
        if(data && data.length>0){
            console.log("deleted data=>", data)
            return res.status(200).json({
                msg:'News deleted successfully',
                totalCount:data.length || 0,
                status:data || []
            })
        }else{
            return res.status(404).json({
                msg:'You dont have access',
                totalCount:data.length || 0,
                status:[]
            })
        }
  } catch (error) {
    console.log("delete Error=>", error)
  }
}

module.exports = {
    getAllNewsData,
    addNewsData,
    updateNewsData,
    deleteNewsData
}