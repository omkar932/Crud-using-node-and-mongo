const dbConnect = require('../db')

    const getAllArticleData = async (req, res)=>{
       
        try {
            let data  = await dbConnect;
            data = await data.collection('article').find({}).toArray();

            if(data && data.length>0){
                console.log("User Data=>", data)
                return res.status(200).json({
                    msg:'Article fetch successfully',
                    totalCount:data.length || 0,
                    status:data || []
                })
            }else{
                return res.status(404).json({
                    msg:'Page not found',
                    totalCount:data.length || 0,
                    status:[]
                })
            }
        } catch (error) {
            console.log("ArticleData loading failed=>", error)
        }
    }
    // adding article to mongodb
    const addArticleData = async (req,res)=>{
        try {
            let data = await dbConnect();
            data = await data.collection('article').insertOne(req.body)
            if(data && data.length>0){
                console.log("data=>", data)
                return res.status(200).json({
                    msg:'Article added successfully',
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
    // updating article in mongodb
    const updateArticleData = async (req,res)=>{
        try {
            let data = await dbConnect();
            data = await data.collection('article').updateOne(
                {title: req.params.title},
                {$set:req.body}
            )
            if(data && data.length>0){
                console.log("updated data=>", data)
                return res.status(200).json({
                    msg:'Article updated successfully',
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
    // deleting article from mongodb
    const deleteArticleData =async (req,res)=>{
        try {
            let data = await dbConnect();
            data = await data.collection('article').deleteOne(
                {_id:new mongodb.ObjectId(req.params.id)}
            )
            if(data && data.length>0){
                console.log("deleted data=>", data)
                return res.status(200).json({
                    msg:'Article deleted successfully',
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
            console.log("Deleting Error=>", error)
        }
    }
    
        



module.exports = {
    getAllArticleData,
    addArticleData,
    updateArticleData,
    deleteArticleData
}