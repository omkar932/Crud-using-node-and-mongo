const {MongoClient} = require('mongodb')
require('dotenv').config()
const dbName =process.env.DBNAME || "news-api";
const url = 'mongodb+srv://omkar:omkar@cluster0.ionlq.mongodb.net/news-api?retryWrites=true&w=majority';
const client = new MongoClient(url);


const  getData=async()=>{
    try {
        let result = await client.connect();
        return result.db(dbName);
    } catch (error) {
        console.log("error", error)
    }
    
}


module.exports = getData