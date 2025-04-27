const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.createUser(name, email, hashedPassword, role);
  res.json({ message: 'User created', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid Credentials' });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).json({ error: 'Invalid Credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
