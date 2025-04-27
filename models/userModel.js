const db = require('../config/db');

// Default user is set to user for now and one admin user can be modified using db for now.
exports.createUser = async (name, email, hashedPassword, role = 'user') => {
  const result = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

exports.findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};