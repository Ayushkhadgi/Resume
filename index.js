let express = require('express');
let app = express();
/// for reading value form .env 
let dotenv = require('dotenv');
dotenv.config();
// for logging purposes
let morgan = require('morgan');
let fs = require('fs');
let port = process.env.PORT || 9800;
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://ayush:ayush123@cluster0.fvalbpb.mongodb.net/Resume?retryWrites=true&w=majority";
let bodyParser = require('body-parser');
let db;

// middleware
app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('This is From Express App code')
})

app.post('/resume',(req,res) => {
    console.log(req.body);
    db.collection('resumeapi').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('')
    })
})

MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(`Error while connecting`);
    db = client.db('Resume')
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})