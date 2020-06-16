var path = require("path")
var express =require("express");
var data = require('../backend/data.js');
var config =require('../backend/config');
var dotenv = require('dotenv');
var mongoose = require('mongoose') ;
var router = require("./routes/userRoute");
var productRoute = require("./routes/productRoute")

var bodyParser =require('body-parser');


dotenv.config();

const mongodburl= config.MONGODB_URL;
const URI = process.env.MONGODB_URL || 'mongodb+srv://admin:passwordpassword@cluster0-bco9o.mongodb.net/Koob?retryWrites=true&w=majority'
const connectDb = async()=>{
    await  mongoose.connect(URI,{
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    console.log("db connected")
    )
}
connectDb();

const PORT = process.env.PORT || 3002



// const localDb= async()=>{
//     await mongoose.connect(mongodburl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true

// },
// console.log("dbConneced")
// ).catch(error=> console.log(error.reason));

// }

// localDb();



const app = express();

app.use(bodyParser.json());

app.use("/api/users", router);

app.use("/api/products", productRoute);


// app.get("/api/product/:id",(req, res)=>{
//     const productId = req.params.id;
    
//     const product = data.products.find(x =>x.dressId === productId);
//     console.log(productId)
//     if(product)
//         res.send(product);
//     else
//         res.status(400).send( { msg: "Product Not Found" });
// })

// app.get("/api/products",(req, res)=>{
//     res.send(data.products);
// })


// if (process.env.NODE_ENV === 'production')
// {
//     app.use(express.static('koob/build/index.js'))
// }

app.use(express.static(path.resolve(__dirname, '../koob', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../koob', 'build', 'index.html'));
  console.log(path.resolve(__dirname, '../koob', 'build', 'index.html'))
});



app.listen(PORT,()=>{
    console.log("connected");
})