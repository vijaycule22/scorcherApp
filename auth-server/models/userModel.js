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
};
