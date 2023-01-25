import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      status: "error",
      msg: "no token",
    });

  jwt.verify(token, config.tokenSecret as string, (err, user) => {
    if (err)
      return res.status(401).json({
        status: "error",
        msg: "not authed",
      });
    req.body.user = user;
    next();
  });
};

export default authenticateToken;
