const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../services/userService");
require("dotenv").config();

module.exports = {
  /**
   * Description: Controller function for user signup
   */
  signup: async (req, res) => {
    try {
      // Extract details from the request body
      const { name, email, password, role } = req.body;
      // Hash the password using bcrypt to store in the db
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create user in the db
      const user = await userModel.createUser(name, email, hashedPassword, role);
      res.json({ message: "User created", user });
    } catch (error) {
      console.error("Error during signup:", error.message);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  /**
   * Description: Controller function for user login
   */
  login: async (req, res) => {
    try {
      // Extract email and pass form the request body
      const { email, password } = req.body;
      // Check if user exists
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      // Validate the user by comparing hashed password
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      // Return jwt token and login the user
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
