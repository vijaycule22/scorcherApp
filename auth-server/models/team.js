import client from "../config/db.js";

export default {
  createTeam: async ({ name, city }) => {
    const result = await client.query(
      "INSERT INTO teams (name, city) VALUES ($1, $2) RETURNING id, name, city",
      [name, city]
    );
    return result.rows[0];
  },

  getAllTeams: async () => {
    const result = await client.query("SELECT * FROM teams");
    return result.rows;
  },

  getTeamById: async (id) => {
    const result = await client.query("SELECT * FROM teams WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  updateTeam: async (id, { name, city }) => {
    const result = await client.query(
      "UPDATE teams SET name = $2, city = $3 WHERE id = $1 RETURNING id, name, city",
      [id, name, city]
    );
    return result.rows[0];
  },

  deleteTeam: async (id) => {
    const result = await client.query("DELETE FROM teams WHERE id = $1", [id]);
    return result.rowCount > 0;
  },
};
