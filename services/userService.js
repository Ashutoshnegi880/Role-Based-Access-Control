const db = require("../config/db");

module.exports = {
  // Default user is set to 'user' for now and one admin user can be modified using DB for now.
  createUser: async (name, email, hashedPassword, role = "user") => {
    try {
      const result = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, hashedPassword, role]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new Error("Database error while creating user");
    }
  },

  findUserByEmail: async (email) => {
    try {
      const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error finding user by email:", error.message);
      throw new Error("Database error while fetching user");
    }
  }
};
