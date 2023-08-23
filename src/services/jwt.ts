import jwt from "jsonwebtoken";

export const generateToken = (payload: string) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });
  return token;
};

export const verifyToken = async (token: string) => {
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);
  console.log("entered verify token", decodedToken);
  return decodedToken;
};
