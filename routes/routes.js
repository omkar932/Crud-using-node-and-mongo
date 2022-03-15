const express = require('express');
const jwt = require('jsonwebtoken');
const articleControllers = require('../controllers/article.controller');
const logincontrollers = require('../controllers/login.controller');
const newsControllers = require('../controllers/news.controller');
const userControllers = require('../controllers/user.controller');
const router = express.Router(); 
const verifyToken=(req,res,next)=>{
    try{
        //bearer tokenstring
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,'6b30cfcb22d33ebfd47a6b98442ef2ef4509d280d6c6e37caa5aa98fb4aca995835964085110caf78db1a79b4aeaf70d612be2056e38785716c2e4d09cf0a995');
        req.userData = decoded;
        next();
    }catch(err){return res.status(401).json({status:true,mess:"You cant access this",data:err})}
}
    // user login
    router.post('/login',logincontrollers.userLogin)

    //get list of all users
    router.get('/',userControllers.getAllUserData);
    // create new user  || register using this
    router.post('/register',userControllers.addUserData);
    // update user 
    router.put('/',verifyToken,userControllers.updateUserData);
    // delete user
    router.delete('/',verifyToken,userControllers.deleteUserData)
    
    //get list of all news
    router.get('/news',verifyToken,newsControllers.getAllNewsData);
    // create new news
    router.post('/news',verifyToken,newsControllers.addNewsData);
    // update news 
    router.put('/news/:title',verifyToken,newsControllers.updateNewsData);
    // delete news
    router.delete('/news/:id',verifyToken,newsControllers.deleteNewsData)
    
    //get list of all article
    router.get('article',articleControllers.getAllArticleData);
    // create new article
    router.post('article',verifyToken,articleControllers.addArticleData);
    // update article 
    router.put('/article/:title',verifyToken,articleControllers.updateArticleData);
    // delete article
    router.delete('/article/:id',verifyToken,articleControllers.deleteArticleData)


module.exports = router;