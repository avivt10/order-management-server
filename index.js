const express = require('express');
const bodyParser = require("body-parser")
const app = express()
const ordersRoutes = require("./routes/orders-routes")
const HttpError = require("./models/http-error");
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const cors = require("cors")

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`run port : ${PORT}`)
});

app.use(cors())

app.use((req, res, next) => {
  const allowedOrigin = req.headers.origin || 'http://localhost:5173';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json())

app.use('/api/orders',ordersRoutes);

app.use((req,res,next) =>{
  const error = new HttpError('Could not find this route.',404)
  throw error
})

mongoose.connect(`mongodb+srv://aviv:1234@cluster0.mrnkary.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(2022)
}).catch(err=>{
    console.log(err)
})
