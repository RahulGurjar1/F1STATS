const mongoose = require("mongoose");

class UserRepository {
    constructor() {
        this.User = mongoose.model("User");
    }

    async save(user) {
        try {
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    async userById(id) {
        try {
            return await this.User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async userByEmail(email) {
        try {
            return await this.User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;