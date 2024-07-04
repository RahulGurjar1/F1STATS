const UserRepository = require("../repository/UserRepository");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

class AuthController {
    constructor() {
        this.repo = new UserRepository();
    }

    checkLogin = [
        check("email", "Please Enter a valid Email").isEmail(),
        check("password", "Please enter a valid password").isLength({ min: 6 }),
    ];

    doLogin = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await this.repo.userByEmail(email);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const userId = user.id || user._id;
            if (!userId) {
                throw new Error("User ID not found");
            }

            const payload = {
                user: {
                    id: userId.toString(),
                },
            };

            const token = jwt.sign(payload, "randomString", { expiresIn: 3600 });
            res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Server Error" });
        }
    };

    checkSignUp = [
        check("username", "Please Enter a valid Username").not().isEmpty(),
        check("email", "Please Enter a valid Email").isEmail(),
        check("password", "Please enter a valid password").isLength({ min: 6 }),
    ];

    doSignUp = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const existingUser = await this.repo.userByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User Already Exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                username,
                email,
                password: hashedPassword,
            });

            const savedUser = await this.repo.save(user);

            const userId = savedUser.id || savedUser._id;
            if (!userId) {
                throw new Error("User ID not found after saving");
            }

            const payload = {
                user: {
                    id: userId.toString(),
                },
            };

            const token = jwt.sign(payload, "randomString", { expiresIn: 3600 });
            res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Error in Saving" });
        }
    };

    doGetMe = async (req, res) => {
        try {
            const user = await this.repo.userById(req.user.id);
            if (!user) return res.status(404).json({ message: "User Not Found" });
            const userWithoutPassWord = {
                createdAt: user.createdAt,
                id : user._id || user.id,
                username: user.username,
                email: user.email,
            };
            res.status(200).json(userWithoutPassWord);
        } catch (e) {
            console.error(e);
            res.send({ message: "Error in Fetching user" });
        }
    }        
}

module.exports = AuthController;