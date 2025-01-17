const client = require('../config/db');

async function getUserByEmail(email) {
  const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function createUser(email, hashedPassword, name, roleId) {
  const result = await client.query(
    'INSERT INTO users (email, password, name, role_id) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role_id',
    [email, hashedPassword, name, roleId]
  );
  return result.rows[0];
}

async function deleteUser(id) {
  await client.query('DELETE FROM users WHERE id = $1', [id]);
}

module.exports = {
  getUserByEmail,
  createUser,
  deleteUser
};
