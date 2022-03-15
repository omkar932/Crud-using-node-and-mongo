const dbConnect = require('../db')
const  collectionName = "users"
// gettinng user data from mongoDB
const getAllUserData =async (req, res)=>{
    try {
        let data  = await dbConnect();
        let data1 = await data.collection(collectionName).find({}).toArray();
        if(data1 && data1.length>0){
            console.log("User Data=>", data1)

            return res.status(200).json({
                msg:'Users fetch successfully',
                totalCount:data1.length || 0,
                status:data1 || []
            })
        }else{
            return res.status(404).json({
                msg:'Page not found',
                totalCount:data1.length || 0,
                status:[]
            })
        }
    } catch (error) {
        console.log("UserData loading failed=>", error)
    }
}
// adding user data to mongodb
const addUserData = async (req,res)=>{
    
    try {
        let data = await dbConnect();

        let dataInsert = {
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            city:req.body.city,
            mobile:req.body.mobile
        }
    let createRes = await data.collection(collectionName).insertOne(dataInsert)
    if(createRes){
        console.log("RES=>", createRes)
        return res.status(200).json({
            msg:'Users added successfully',
            status:createRes || []
        })
    }else{
        return {
            msg:'failed to add',
            status:[]
        }
    }
    } catch (error) {
        console.log("create Error=>", error)
    }
}
// updating user data in mongodb
const updateUserData =async (req,res)=>{
    try {
        let data = await dbConnect();
        data = await data.collection(collectionName).updateOne(
            {_id:new mongodb.ObjectId(req.params.id)},
            {$set:req.body}
        )
        if(data && data.length>0){
            console.log("updated data=>", data)
            return res.status(200).json({
                msg:'Users updated successfully',
                totalCount:data.length || 0,
                status:data || []
            })
        }else{
            return res.status(401).json({
                msg:'You dont have access',
                totalCount:data.length || 0,
                status:[]
            })
        }
        
    } catch (error) {
        console.log("Udating Error=>", error)
    }
}
//deleting user data in mongodb
const deleteUserData =async (req,res)=>{
    
    try {
        let data = await dbConnect();
        data = await data.collection(collectionName).deleteOne(
        {_id:new mongodb.ObjectId(req.params.id)}
    )
    if(data && data.length>0){
        console.log("deleted data=>", data)
        return res.status(200).json({
            msg:'Users deleted successfully',
            totalCount:data.length || 0,
            status:data || []
        })
    }else{
        return {
            msg:'failed to delete',
            status:[]
        }
    }
    } catch (error) {
        console.log("Deleting Error=>", error)
    }
}


module.exports = {
    getAllUserData,
    addUserData,
    updateUserData,
    deleteUserData
}
