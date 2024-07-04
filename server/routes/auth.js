const AuthController = require("../controller/AuthController");
const auth = require("../middlewares/auth");

const controller = new AuthController();

module.exports = function(app){
    app.post("/login", controller.checkLogin, controller.doLogin);
    app.post("/signup", controller.checkSignUp, controller.doSignUp);
    app.get("/me",auth,controller.doGetMe);
};