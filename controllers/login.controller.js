const jwt = require('jsonwebtoken');
const dbConnect = require('../db')
    const userLogin = async(req,res)=>{
        let data  = await dbConnect();
        data1 =await data.collection('users')
        name =req.body.name,
        password =req.body.password
        if(name === req.body.name && password === req.body.password){
            const access_token = jwt.sign({sub:name},'6b30cfcb22d33ebfd47a6b98442ef2ef4509d280d6c6e37caa5aa98fb4aca995835964085110caf78db1a79b4aeaf70d612be2056e38785716c2e4d09cf0a995',{expiresIn:90})
            return res.json({status:true,mes:'login success', data:{access_token:access_token}})
        }
        return res.status(401).json({status:true,mes:'Authentication error'})
    }    


    module.exports = {userLogin}
