import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Todo } from "../entities/todo";
import { JwtPayload } from "jsonwebtoken";

export const getTodos = async (req: Request, res: Response) => {
  try {
    let user: JwtPayload | null = req.user as JwtPayload;
    let userid = user?.id
    const todoRepository = getRepository(Todo);
    const todos = await todoRepository.find({
      where: {
        userid: userid,
      },
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching todos." });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todoRepository = getRepository(Todo);
    const todoId: number = +req.params.id;
    const todo = await todoRepository.findOne({
      where: {
        id: todoId,
      },
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the todo." });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    let user: JwtPayload | null = req.user as JwtPayload;
    let userid = user?.id;
    const todoRepository = getRepository(Todo);
    const { title, description } = req.body;
    const newTodo = todoRepository.create({ title, description, userid });
    await todoRepository.save(newTodo);
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the todo." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todoRepository = getRepository(Todo);
    const todoId: number = +req.params.id;
    const { title, description, status } = req.body;
    const todo = await todoRepository.findOne({
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
    await todoRepository.save(todo);
    res.json(todo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the todo." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoRepository = getRepository(Todo);
    const todoId: number = +req.params.id;
    const todo = await todoRepository.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    await todoRepository.remove(todo);
    res.json({ message: "Todo deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the todo." });
  }
};
