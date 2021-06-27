import { RequestHandler } from "express";
import User from "./user.model";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    return res.json(e);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) return res.json(user);
    else return res.status(204).json();
  } catch (e) {
    return res.status(204).json();
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) {
      return res.status(301).json({ message: "User exist" });
    }
    const user = new User(req.body);
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (e) {
    return res.json(e);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) return res.json(user);
    else return res.status(204).json();
  } catch (e) {
    return res.status(204).json();
  }
};

export const deleteUsers: RequestHandler = async (req, res) => {
  try {
    const deleted: string[] = [];
    for (let del of req.body) {
      const user = await User.findByIdAndDelete(del);
      if (user) deleted.push(user._id);
    }
    if (deleted.length) return res.json(JSON.stringify(deleted));
  } catch (e) {
    return res.status(204).json();
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (user) return res.json(user);
    else res.status(204).json();
  } catch (e) {
    return res.status(204).json();
  }
};
