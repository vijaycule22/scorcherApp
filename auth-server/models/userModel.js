import pool from "../config/db.js"; // Import the pool instead of client

export default {
  getUserByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  createUser: async ({ email, password, name, roleId }) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "INSERT INTO users (email, password, name, role_id) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role_id",
        [email, password, name, roleId]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },

  getUserById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  getAllUsers: async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },

  updateUser: async (id, name) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "UPDATE users SET name = $2 WHERE id = $1 RETURNING id, name",
        [id, name]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },

  deleteUser: async (id) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING id",
        [id]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },
};
