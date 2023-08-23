import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user";
import { passwordHashing, passwordComparing } from "../services/bcrypt";
import { generateToken } from "../services/jwt";

interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  token: string; 
}

export const signupUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    let { username, email, password } = req.body;

    password = await passwordHashing(password);

    const newUser = userRepository.create({
      username,
      email,
      password,
    });

    const savedUser = await userRepository.save(newUser);
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    let { email, password } = req.body;
    let user = await userRepository.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }

    let passwordCheck = passwordComparing(user?.password, password);

    if (!passwordCheck) {
      return res.status(404).json({ message: "user not found." });
    }
    const token = generateToken(user?.username);
    const response: UserResponse = { ...user, token };
    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
};
