import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt";

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.header("Authorization");
//   let token =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYXJqdW4iLCJpYXQiOjE2OTI3OTg0NzUsImV4cCI6MTY5Mjk3MTI3NX0.oXUxsl7RYRUl4S6awggyU8F5Qg7beyMn5VlcZzB53yA";

  console.log("token ::", token);

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  let decodeToken = await verifyToken(token);
  console.log("after token verify", decodeToken);
  if (!decodeToken) {
    return res.status(401).json({ message: "Authentication required." });
  }

  req.user = decodeToken;
  next();
};

export default authenticateJWT;
