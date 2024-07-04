const express = require("express");
const app = express();

const consign = require("consign");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
consign().include("./routes").into(app);

//404
app.use(function(req, res, next) {
    let err= new Error("Not Found");
    err.stauts(404);
    next(err);
});

//error
app.use(function(err, req, res, next) {
    let status= err.status || 500;
    let error= {message:err.message};
    if(app.get("env") === "production"){
        console.log(err);
        res.status(status).json(error);
    }else{
        error.message=status+ ""+err;
        res.status(status).send(err.stack);
    }    
});

module.exports = function() {
    return app;
}