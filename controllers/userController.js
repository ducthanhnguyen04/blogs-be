const model = require("../models/index");
const UserModel = model.User;
const UserService = require("../services/userService");

class UserController {
    async getAll(req, res) {
        try {
            const users = await UserService.getAllUser();
            return res.status(200).json({
                success: true,
                data: users
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "BUG!"
            });
        }
    }
    async addUser(req, res) {
        try {
            const {name, email, password, birthday} = req.body;
            const newUser = await UserService.createUser({
                name, email, password, birthday, 
            });
            return res.status(200).json({
                success: true,
                data: newUser
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "BUG!"
            })
        }
    }
}
module.exports = new UserController();