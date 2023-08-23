import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt";
import { JwtPayload } from "jsonwebtoken";

import { getRepository } from "typeorm";
import { User } from "../entities/user";

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(User);
  let token = req.header("Authorization");
  //   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYXJqdW4iLCJpYXQiOjE2OTI3OTg0NzUsImV4cCI6MTY5Mjk3MTI3NX0.oXUxsl7RYRUl4S6awggyU8F5Qg7beyMn5VlcZzB53yA";
  if (token) {
    token = token.replace(/^Bearer\s+/i, "");
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }
  console.log("token ::", token);

  console.log("...............................................");

  const decodeToken: JwtPayload | null = (await verifyToken(
    token
  )) as JwtPayload;
  console.log("...............................................");

  console.log("after token verify", decodeToken,"username : ",decodeToken?.payload);

  let user = await userRepository.findOne({
    where: {
      username: decodeToken?.payload,
    },
  });
  if (user) {
    console.log(user);
    
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }
};

export default authenticateJWT;
