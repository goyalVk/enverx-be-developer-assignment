const express = require("express")
const app = express()
var bodyParser = require("body-parser")

const db = require("./Modules/db")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


console.log('hello')
const user = require('./Routes/user').Router

app.use('/user', user);

app.listen(7000,()=>{
    console.log('server is listening on port 7000')
})