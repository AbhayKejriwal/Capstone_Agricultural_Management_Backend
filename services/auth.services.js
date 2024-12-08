// Authentication Service
// Implements business logic for user authentication and management.

import { User } from '../models/User.js';

export const validateCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return false;
  }
  return user;  
}

export const createUser = async (user) => {
  const newUser = await User.create(user);
  newUser.password = undefined;
  return newUser;
}

export const fetchAllUsers = async () => {
    const users = await User.find();
    users.forEach(user => user.password = undefined);
    return users;
}

export const fetchUser = async (id) => {
  const user = await User.findById(id);
  user.password = undefined;
  return user;
}

export const updateUser = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, { new: true });
}

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
}