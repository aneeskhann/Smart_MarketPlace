import { response } from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const {username, email, password} = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Generate a salt and hash the password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }
    
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: "Login failed" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    const items = users.map((user) => ({
      username: user.username,
      email: user.email,
    }));
    console.log("get all users");
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

  const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    await User.findOneAndDelete({ username });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

export { signup, login, getUsers, deleteUser };
