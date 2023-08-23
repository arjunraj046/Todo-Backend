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
const jwt_1 = require("../services/jwt");
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const userRepository = (0, typeorm_1.getRepository)(user_1.User);
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization");
    //   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYXJqdW4iLCJpYXQiOjE2OTI3OTg0NzUsImV4cCI6MTY5Mjk3MTI3NX0.oXUxsl7RYRUl4S6awggyU8F5Qg7beyMn5VlcZzB53yA";
    console.log("token ::", token);
    if (!token) {
        return res.status(401).json({ message: "Authentication required." });
    }
    const decodeToken = (yield (0, jwt_1.verifyToken)(token));
    console.log("after token verify", decodeToken);
    let user = yield userRepository.findOne({
        where: {
            username: decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.username,
        },
    });
    if (user) {
        req.user = user;
        next();
    }
    else {
        return res.status(401).json({ message: "Authentication required." });
    }
});
exports.default = authenticateJWT;
