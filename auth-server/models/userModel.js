import client from "../config/db.js";

export default {
  getUserByEmail: async (email) => {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  createUser: async ({ email, password, name, roleId }) => {
    const result = await client.query(
      "INSERT INTO users (email, password, name, role_id) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role_id",
      [email, password, name, roleId]
    );
    return result.rows[0];
  },

  getUserById: async (id) => {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
  getAllUsers: async () => {
    const result = await client.query("SELECT * FROM users");
    return result.rows;
  },
  updateUser: async (id, name) => {
    const result = await client.query(
      "UPDATE users SET name = $2 WHERE id = $1",
      [id, name]
    );
    return result.rows[0];
  },
  deleteUser: async (id) => {
    const result = await client.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
};
