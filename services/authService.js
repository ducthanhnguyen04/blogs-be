const model = require("../models/index");
const UserModel = model.User;
const { hashPassword } = require("../utils/auth");
const {comparePassword} = require("../utils/auth");
const jwt = require("jsonwebtoken");

class AuthService {
    async register(name, email, password, birthday) {
            const hashedPassword = await hashPassword(password);
            const newAccount = await UserModel.create({
                name: name,
                email: email,
                password: hashedPassword,
                birthday: birthday,
                avatar: "http://localhost:3001/avatars/default.png",
                authority_id: 2
            });
            return newAccount;
    }
    async login(email, password) {
        const user = await UserModel.findOne({
            where: { email }
        });

        if (!user) {
            const err = new Error('Email hoặc mật khẩu không đúng');
            err.statusCode = 401;
            throw err;
        }

        const isPassword = await comparePassword(password, user.password);
            if (!isPassword) {
                const err = new Error('Email hoặc mật khẩu không đúng');
                err.statusCode = 401;
                throw err;
            }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                avatar: user.avatar
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            avatar: user.avatar
        };

        return {
            user: safeUser,
            token
        };
}

}
module.exports = new AuthService();