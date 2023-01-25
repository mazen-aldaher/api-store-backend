import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/config";

const userModel = new UserModel();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createUser(req.body);
    res.json({
      status: "success",
      data: { ...user },
      message: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getUsers();
    res.json({
      status: "success",
      data: users,
      message: "user retrived  successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getUserById(
      req.params.id as unknown as string
    );
    res.json({
      status: "success",
      data: user,
      message: "user retrived successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.body);
    res.json({
      status: "success",
      data: user,
      message: "user updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.removeUser(req.params.id as unknown as string);
    res.json({
      status: "success",
      data: user,
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticateUser(email, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "the username or password do not match please try again",
      });
    }
    return res.json({
      status: "success",
      data: { ...user, token },
      message: "user authenticated successfully",
    });
  } catch (err) {
    return next(err);
  }
};
