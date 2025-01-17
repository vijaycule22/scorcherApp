const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { getRoleIdByName } = require('../models/roleModel'); // Assumed model for roles

async function signup(req, res) {
  const { email, password, name, role } = req.body;

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleId = await getRoleIdByName(role || 'user');
    const newUser = await userModel.createUser(email, hashedPassword, name, roleId);

    const token = jwt.sign({ id: newUser.id, role: role || 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send reset link (email sending logic goes here)

    res.status(200).json({ message: 'Password reset link sent successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await userModel.getUserByEmail(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userModel.deleteUser(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  signup,
  login,
  forgotPassword,
  deleteUser
};
