"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("./entities/todo");
const user_1 = require("./entities/user");
const connectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sanika',
    database: 'postgres',
    // host: 'my-todo.cweibzdpd9si.ap-south-1.rds.amazonaws.com',
    // port: 5432,
    // username: 'arjun', 
    // password: 'sanika123', 
    // database: 'postgres', 
    entities: [user_1.User, todo_1.Todo],
    synchronize: true, // Automatically create database schema based on entities
};
exports.default = connectionOptions;
