const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../services/userService");
require("dotenv").config();

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.createUser(name, email, hashedPassword, role);
      res.json({ message: "User created", user });
    } catch (error) {
      console.error("Error during signup:", error.message);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: "Failed to login" });
    }
  },
};
