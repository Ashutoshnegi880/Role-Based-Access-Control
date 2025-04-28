const db = require("../config/db");

module.exports = {
  /**
   * @description : Function to add new user to the users table
   * @param {String} name : Name of the user
   * @param {String} email : email of the user
   * @param {String} hashedPassword : Hashed password of the user that will be saved in the db
   * @param {String} role : Role of the user("user"/"admin"), default: user
   */
  createUser: async (name, email, hashedPassword, role = "user") => { // Default user is set to 'user' for now and one admin user can be modified using DB for now.
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

  /**
   * @description : Function to find the user details from db when user tries to login
   * @param {String} email : email of the user
   */
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
