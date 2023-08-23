"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Authentication required." });
    }
};
exports.default = authenticateJWT;
