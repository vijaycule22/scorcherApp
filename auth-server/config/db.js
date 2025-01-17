// const { Client } = require('pg');
// console.log("db user " + process.env.DB_USER);
// const client = new Client({

//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err.stack));

// module.exports = client;

import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "default",
  host: "ep-damp-term-a1avxg8a-pooler.ap-southeast-1.aws.neon.tech",
  database: "verceldb",
  password: "e4JPmfqM8ygT",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

export default client;
