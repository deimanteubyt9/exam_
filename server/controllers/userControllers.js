import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export async function registerUser (req, res)
   {
  try {
    const { name, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, surname, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export async function loginUser(req, res) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required"})
    }
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
    if (isPasswordCorrect) {
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ id: user._id, username: user.username}, secretKey, { expiresIn: "1h"})
  
      res.json({ token })
    } else {
      res.status(401).json({ message: "Password incorrect"})
    }
  }
  
  export async function getUsers(req, res) {
    const users = await User.find();
  
    res.json(users);
  }