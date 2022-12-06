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
let mongoUrl = process.env.MongoLocal;
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
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(`Error while connecting`);
    db = client.db('ayushak')
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})