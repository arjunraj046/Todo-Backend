"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/", authController_1.loginUser);
router.post("/signup", authController_1.signupUser);
router.get("/todo", authMiddleware_1.default, todoController_1.getTodos);
router.get("/todo/:id", authMiddleware_1.default, todoController_1.getTodoById);
router.post("/todo/create", authMiddleware_1.default, todoController_1.createTodo);
router.put("/todo/:id", authMiddleware_1.default, todoController_1.updateTodo);
router.delete("/todo/:id", authMiddleware_1.default, todoController_1.deleteTodo);
exports.default = router;
