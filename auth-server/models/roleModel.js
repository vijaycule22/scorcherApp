// models/roleModel.js
const client = require('../config/db');

async function getRoleIdByName(roleName) {
  const result = await client.query('SELECT id FROM roles WHERE name = $1', [roleName]);
  return result.rows[0]?.id;  // Returns the role ID or undefined if not found
}

module.exports = {
  getRoleIdByName,
};
