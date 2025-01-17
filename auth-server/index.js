// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { Client } = require('pg');
// const app = express();
// app.use(express.json());

// const client = new Client({
//   user: 'default', // your db username
//   host: 'ep-damp-term-a1avxg8a-pooler.ap-southeast-1.aws.neon.tech',
//   database: 'verceldb',
//   password: 'e4JPmfqM8ygT', // your db password
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false, // This is often needed for cloud databases
//   },
// });

// client.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err.stack));

// app.get('/', (req, res) => {
// res.send('Hello World!');
// });

// // Register Route
// app.post('/api/auth/signup', async (req, res) => {
//   const { email, password, name, role } = req.body;

//   try {
//     // Check if user already exists
//     const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (result.rows.length > 0) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Get role ID
//     const roleResult = await client.query('SELECT id FROM roles WHERE name = $1', [role || 'user']);
//     const roleId = roleResult.rows[0].id;

//     // Insert new user into the database
//     const userResult = await client.query(
//       'INSERT INTO users (email, password, name, role_id) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role_id',
//       [email, hashedPassword, name, roleId]
//     );

//     const newUser = userResult.rows[0];

//     // Generate JWT Token
//     const token = jwt.sign({ id: newUser.id, role: role || 'user' }, 'your_jwt_secret', { expiresIn: '1h' });

//     res.status(201).json({ message: 'User registered successfully', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: 'User does not exist' });
//     }

//     // Check if password is correct
//     const user = result.rows[0];
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ id: user.id, role: user.role_id }, 'your_jwt_secret', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // delete user route
// app.delete('/api/auth/delete/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Check if user exists
//     const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Delete user
//     await client.query('DELETE FROM users WHERE id = $1', [id]);

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // user forgot password route
// app.post('/api/auth/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Check if user exists
//     const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

//     // Send password reset link
//     // ...

//     res.status(200).json({ message: 'Password reset link sent successfully', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start server
// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});
