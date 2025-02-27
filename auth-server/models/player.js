import client from "../config/db.js";

export default {
  createPlayer: async ({
    name,
    age,
    teamId,
    roleName,
    isCaptain = false,
    playerRating,
    isPlaying11 = true,
    playing11Position,
  }) => {
    try {
      // Fetch the role_id from player_roles table using the roleName
      const roleResult = await client.query(
        "SELECT id FROM player_roles WHERE role_name = $1",
        [roleName]
      );

      if (roleResult.rows.length === 0) {
        throw new Error("Role not found.");
      }

      const roleId = roleResult.rows[0].id;

      // Insert the player with additional columns
      const playerResult = await client.query(
        "INSERT INTO players (name, age, team_id, role_id, is_captain, player_rating, is_playing11, playing11_position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          name,
          age,
          teamId,
          roleId,
          isCaptain,
          playerRating,
          isPlaying11,
          playing11Position,
        ]
      );

      return playerResult.rows[0];
    } catch (error) {
      throw error;
    }
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

  updatePlayer: async (
    playerId,
    {
      name,
      age,
      teamId,
      roleName,
      isCaptain,
      playerRating,
      isPlaying11,
      playing11Position,
    }
  ) => {
    try {
      // Fetch the role_id from player_roles table
      const roleResult = await client.query(
        "SELECT id FROM player_roles WHERE role_name = $1",
        [roleName]
      );

      if (roleResult.rows.length === 0) {
        throw new Error("Role not found.");
      }

      const roleId = roleResult.rows[0].id;

      // Update the player with additional columns
      const playerResult = await client.query(
        "UPDATE players SET name = $1, age = $2, team_id = $3, role_id = $4, is_captain = $5, player_rating = $6, is_playing11 = $7, playing11_position = $8 WHERE id = $9 RETURNING *",
        [
          name,
          age,
          teamId,
          roleId,
          isCaptain,
          playerRating,
          isPlaying11,
          playing11Position,
          playerId,
        ]
      );

      if (playerResult.rows.length === 0) {
        throw new Error("Player not found.");
      }

      return playerResult.rows[0];
    } catch (error) {
      throw error;
    }
  },

  deletePlayer: async (id) => {
    const result = await client.query("DELETE FROM players WHERE id = $1", [
      id,
    ]);
    return result.rowCount > 0;
  },

  getPlayerByTeamId: async (teamId) => {
    const result = await client.query(
      "SELECT p.id, p.name, p.role_id, p.age, p.is_captain, p.player_rating, p.is_playing11, p.playing11_position, p.price, t.name AS team_name FROM players p JOIN teams t ON p.team_id = t.id WHERE p.team_id = $1",
      [teamId]
    );
    return result.rows;
  },

  setCaptain: async (playerId) => {
    const result = await client.query(
      "UPDATE players SET is_captain = TRUE WHERE id = $1 AND id IN (SELECT player_id FROM player_roles WHERE role_name = 'Captain')",
      [playerId]
    );

    if (result.rowCount === 0) {
      throw new Error("Player cannot be set as captain.");
    } else if (result.rowCount > 1) {
      throw new Error("Multiple captains found.");
    }
  },
};
