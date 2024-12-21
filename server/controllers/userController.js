import { response } from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({ path: "./server/.env" });

const secret_token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9"

const signup = async (req, res) => {
  try {
    const {username, email, password, role} = req.body;

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
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Received credentials:", { username, password }); 
  
  try { 
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ valid: false, message: "Invalid credentials entered" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ valid: false, message: "error" });
    }

    const access_Token = jwt.sign({ ...user._doc },secret_token);
    res.status(200).json({...user._doc, access_Token: access_Token} );
    console.log("Credentials matched.Login Successful")
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ valid: false, message: "Login failed" });
  }
};

// // JWT-based logout function
const logout = (req, res) => {
  // Invalidate the token by clearing it from the client side
  res.status(200).json({ message: "Logged out successfully" });
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    
    console.log("get all users");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.userId)
    if(!deleteUser) {
      return res.status(404).json({error: "User not found"})
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = req.body;
    console.log(req.body)

    // Check if the user exists
    const user = await User.findByIdAndUpdate(userId, updatedUser,{
      new: true, 
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    user.username = updatedUser.username || user.username;
    user.email = updatedUser.email || user.email;
    user.role = updatedUser.role || user.role;

    // Save the updated user
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the user already exists (by email or username)
    const existingUser = await User.findOne({ $or: [{ username }, { email },{role}] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

  
    await newUser.save();

    // Optionally, generate a JWT token (if you want to send it after user creation)
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    // Send the response with user data and token (if applicable)
    res.status(201).json({ message: 'User added successfully', user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add user' });
  }
};




export { signup, login,logout, getUsers, deleteUser, updateUser, addUser };

