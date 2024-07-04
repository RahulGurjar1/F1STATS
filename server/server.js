const express = require("./express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/express-mongoose", { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
