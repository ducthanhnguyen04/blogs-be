const e = require("express");
const model = require("../models/index");
const UserModel = model.User;
const {comparePassword} = require("../utils/auth");
const AuthService = require("../services/authService");

class AuthController {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({ message: '電子郵件和密碼必須!' });
            }
            const {user, token} = await AuthService.login(email, password);
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60
            })
            res.json({
                message: "登入成功!",
                data: user
            })
        } catch (error) {
            console.error(error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Server error'
        });
        }
    }
    async register(req, res) {
        try {
            const {name, email, password, birthday} = req.body;
            if(!name || !email || !password || !birthday) {
                return res.status(400).json({ message: '名字,生日,電子郵件和密碼必須!' });
            }
            const newAcount = await AuthService.register(name, email, password, birthday);
            return res.status(200).json({
                success: true,
                data: newAcount
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "BUG!"
            })
        }
    }
    async logout(req, res) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        });
        res.json({
            message: "Logout successfully!"
        })
    }
}
module.exports = new AuthController();