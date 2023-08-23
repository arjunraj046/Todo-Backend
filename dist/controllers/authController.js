"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const bcrypt_1 = require("../services/bcrypt");
const jwt_1 = require("../services/jwt");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        let { username, email, password } = req.body;
        password = yield (0, bcrypt_1.passwordHashing)(password);
        const newUser = userRepository.create({
            username,
            email,
            password,
        });
        const savedUser = yield userRepository.save(newUser);
        res.json(savedUser);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while creating the user." });
    }
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        let { email, password } = req.body;
        let user = yield userRepository.findOne({
            where: {
                email: email,
            },
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        let passwordCheck = (0, bcrypt_1.passwordComparing)(user === null || user === void 0 ? void 0 : user.password, password);
        if (!passwordCheck) {
            return res.status(404).json({ message: "user not found." });
        }
        const token = (0, jwt_1.generateToken)(user === null || user === void 0 ? void 0 : user.username);
        const response = Object.assign(Object.assign({}, user), { token });
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the user." });
    }
});
exports.loginUser = loginUser;
