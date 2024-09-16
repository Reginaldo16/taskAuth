import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAcessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash });
    const user = await newUser.save();
    const token = await createAcessToken({
      id: user._id,
    });

    res.cookie("token", token);
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await createAcessToken({
      id: userFound._id,
    });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully" });
};


export const  profile= async (req,res)=>{
  const userExist =await User.findById(req.user.id);
  if(!userExist)return res.status(404).json({ message: "User not found" });
 return res.json({
  id:userExist._id,
  username:userExist.username,
  createdAt:userExist.createdAt

 })
}