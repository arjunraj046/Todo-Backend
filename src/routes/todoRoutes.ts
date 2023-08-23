import { Router } from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import authenticateJWT from "../middleware/authMiddleware";
import { signupUser, loginUser } from "../controllers/authController";

const router = Router();
router.post("/", loginUser);
router.post("/signup", signupUser);

router.get("/todo", authenticateJWT, getTodos);
router.get("/todo/:id", authenticateJWT, getTodoById);
router.post("/todo/create", authenticateJWT, createTodo);
router.put("/todo/:id", authenticateJWT, updateTodo);
router.delete("/todo/:id", authenticateJWT, deleteTodo);

export default router;
