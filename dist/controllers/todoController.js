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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoById = exports.getTodos = void 0;
const typeorm_1 = require("typeorm");
const todo_1 = require("../entities/todo");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        console.log("controller", user);
        const todoRepository = (0, typeorm_1.getRepository)(todo_1.Todo);
        const todos = yield todoRepository.find({
            where: {
                userid: user === null || user === void 0 ? void 0 : user.username,
            },
        });
        res.json(todos);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching todos." });
    }
});
exports.getTodos = getTodos;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoRepository = (0, typeorm_1.getRepository)(todo_1.Todo);
        const todoId = +req.params.id; // Convert id to a number
        console.log("request received", todoId);
        const todo = yield todoRepository.findOne({
            where: {
                id: todoId,
            },
        });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.json(todo);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the todo." });
    }
});
exports.getTodoById = getTodoById;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        console.log("controller", user);
        let userid = user === null || user === void 0 ? void 0 : user.username;
        console.log("body ", req.body);
        const todoRepository = (0, typeorm_1.getRepository)(todo_1.Todo);
        const { title, description } = req.body;
        const newTodo = todoRepository.create({ title, description, userid });
        yield todoRepository.save(newTodo);
        console.log(newTodo);
        res.json(newTodo);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while creating the todo." });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoRepository = (0, typeorm_1.getRepository)(todo_1.Todo);
        const todoId = +req.params.id;
        const { title, description, status } = req.body;
        const todo = yield todoRepository.findOne({
            where: {
                id: todoId,
            },
        });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        todo.title = title;
        todo.description = description;
        todo.status = status;
        yield todoRepository.save(todo);
        res.json(todo);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while updating the todo." });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoRepository = (0, typeorm_1.getRepository)(todo_1.Todo);
        const todoId = +req.params.id;
        const todo = yield todoRepository.findOne({
            where: {
                id: todoId,
            },
        });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        yield todoRepository.remove(todo);
        res.json({ message: "Todo deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while deleting the todo." });
    }
});
exports.deleteTodo = deleteTodo;
