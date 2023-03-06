if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

const apiRouters = require('./routes/api.router');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl,);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cors())

app.use('/api',apiRouters);

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Serving on port ${port}`)
})