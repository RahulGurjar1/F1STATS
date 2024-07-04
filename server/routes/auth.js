const AuthController = require("../controller/AuthController");

const controller = new AuthController();

module.exports = function(app){
    app.post("/login", controller.checkLogin, controller.doLogin);
};