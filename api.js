const express = require('express')
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',require('./routes/routes'))

// AllRoutes();

app.listen(port,()=>{console.log(`server is listening on ${port}`)})
