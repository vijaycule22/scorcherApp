import client from "../config/db.js";

export default {
  getRoleIdByName: async (name) => {
    const result = await client.query("SELECT id FROM roles WHERE name = $1", [
      name,
    ]);
    return result.rows[0]?.id;
  },
};
