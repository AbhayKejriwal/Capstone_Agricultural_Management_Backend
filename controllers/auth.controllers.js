// Authentication Controller functions
/**
 * - registerUser
 * - loginUser
 * - getAllUsers
 * - getUser
 * - putUser
 * - removeUser
 */
// Handles incoming HTTP requests related to user authentication and management.

// Required modules
import { createUser, deleteUser, fetchAllUsers, fetchUser, updateUser, validateCredentials } from '../services/auth.services.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

// Register a new user
export async function registerUser(req, res) {
    try {
        const {username, email, password, role, phoneNumber} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields: username, email, password and role' });
        }
        const user = { username, email, password, role, phoneNumber };
        const newUser = await createUser(user);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Login user
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const user = await validateCredentials(email, password);
        if(!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.role);
        res.cookie('auth', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'None' : 'Lax',
            maxAge: 3600000
        });

        res.status(200).json({ 
            token: token,
            message: 'Login successful',
            userId: user._id,
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// get all users
export async function getAllUsers(req, res) {
    try {
        const users = await fetchAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// get current user by id
export async function getUser(req, res) {
    try {
        const user = await fetchUser(req.user.id);
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// get user by id
export async function getUserById(req, res) {
    try {
        const user = await fetchUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update user profile for current user
export async function putUser(req, res) {
    try {
        const updates = req.body;
        if(updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }
        const user = await updateUser(req.user.id, updates);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update user profile by id
export async function putUserById(req, res) {
    try {
        const updates = req.body;
        console.log(updates);
        if(updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }
        console.log(updates);
        const user = await updateUser(req.params.id, updates);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete user account
export async function removeUser(req, res) {
    try {
        const user = await deleteUser(req.user.id);
        res.status(200).json({ 
            message: 'User deleted successfully',
            user: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
