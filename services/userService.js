const model = require("../models/index");
const UserModel = model.User;

class UserService {
    async getAllUser() {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "BUG!"
            })
        }
    }
    async createUser(name, email, password, birthday) {
        try {
            const newUser = await UserModel.create({
                name: name,
                email: email,
                password: password,
                birthday: birthday,
                avatar: "http://localhost:3001/avatars/default.png",
            });
            return newUser;
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "BUG!"
            })
        }
    }
}
module.exports = new UserService();