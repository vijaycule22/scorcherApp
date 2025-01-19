import client from "../config/db.js";

export default {
  createPlayer: async ({ name, role, age, teamId }) => {
    const result = await client.query(
      "INSERT INTO players (name, role, age, team_id) VALUES ($1, $2, $3, $4) RETURNING id, name, role, age, team_id",
      [name, role, age, teamId]
    );
    return result.rows[0];
  },

  getAllPlayers: async () => {
    const result = await client.query(
      "SELECT p.id, p.name, p.role, p.age, t.name AS team_name FROM players p JOIN teams t ON p.team_id = t.id"
    );
    return result.rows;
  },

  getPlayerById: async (id) => {
    const result = await client.query(
      "SELECT p.id, p.name, p.role, p.age, t.name AS team_name FROM players p JOIN teams t ON p.team_id = t.id WHERE p.id = $1",
      [id]
    );
    return result.rows[0];
  },

  updatePlayer: async (id, { name, role, age, teamId }) => {
    const result = await client.query(
      "UPDATE players SET name = $2, role = $3, age = $4, team_id = $5 WHERE id = $1 RETURNING id, name, role, age, team_id",
      [id, name, role, age, teamId]
    );
    return result.rows[0];
  },

  deletePlayer: async (id) => {
    const result = await client.query("DELETE FROM players WHERE id = $1", [
      id,
    ]);
    return result.rowCount > 0;
  },
};
