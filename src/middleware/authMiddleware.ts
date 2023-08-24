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
  if (token) {
    token = token.replace(/^Bearer\s+/i, "");
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }
  const decodeToken: JwtPayload | null = (await verifyToken(
    token
  )) as JwtPayload;
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
