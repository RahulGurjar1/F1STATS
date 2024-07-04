const express = require("./express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

